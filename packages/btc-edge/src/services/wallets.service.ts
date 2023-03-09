import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import {
    ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT,
    ERROR_WALLET_NAME_ALREADY_ADDED_TO_ACCOUNT,
} from "@cryptify/common/src/errors/error_messages";
import { TransactionsService } from "@cryptify/btc-edge/src/services/transactions_service";
import { TransactionWatcherService } from "@cryptify/btc-edge/src/services/transaction_watcher_service";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { zip } from "@cryptify/common/src/utils/function_utils";
import { DeleteWalletRequest } from "@cryptify/common/src/requests/delete_wallet_request";
import { BlockchainComGateway } from "@cryptify/btc-edge/src/gateways/blockchain_com_gateway";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
        private readonly transactionsService: TransactionsService,
        private readonly blockchainComGateway: BlockchainComGateway,
        private readonly transactionWatcherService: TransactionWatcherService,
    ) {}

    async create(createWalletReq: CreateWalletRequest): Promise<WalletWithBalance> {
        const { address, userId, name } = createWalletReq;

        if (await this.walletRepository.findOneBy({ address, userId })) {
            throw new BadRequestException(
                ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT(titleCase(createWalletReq.currencyType)),
            );
        }
        if (await this.walletRepository.findOneBy({ name, userId })) {
            throw new BadRequestException(ERROR_WALLET_NAME_ALREADY_ADDED_TO_ACCOUNT);
        }

        await this.walletRepository.insert(this.walletRepository.create(createWalletReq));

        // Parallelize getting the wallet balance, backfilling the transactions in the db, and
        // subscribing to the transaction messages for the new wallet is fine since there are
        // no shared resources, once everything resolves the wallet with the balance will be returned
        const [balance] = await Promise.all([
            this.blockchainComGateway.getBalance(address),
            this.transactionsService.backfillTransactions(address),
            this.transactionWatcherService.subscribeAddress(address),
        ]);

        const wallet = await this.walletRepository.findOneBy({
            address,
            userId,
        });
        return { ...wallet, balance };
    }

    async findAll(userId: number): Promise<WalletWithBalance[]> {
        const wallets = await this.walletRepository.find({ where: { currencyType: CurrencyType.BITCOIN, userId } });
        // For each wallet owned by the user get the wallets balance from soChain, we can parallelize these requests
        // to speed up the processing time
        const balances = await Promise.all(
            wallets.map(async (wallet) => this.blockchainComGateway.getBalance(wallet.address)),
        );
        // Once all the balances have been retrieved zip the lists together and map through them to construct the final
        // object, Promise.all will return the values in the same order we inputted them meaning the wallets and balances
        // will line up when we zip them
        return zip(wallets, balances).map(([wallet, balance]) => ({
            ...wallet,
            balance,
        }));
    }

    async findOne(address: string, userId: number): Promise<Wallet> {
        return this.walletRepository.findOne({ where: { address, userId } });
    }

    async delete(deleteWalletReq: DeleteWalletRequest): Promise<WalletWithBalance> {
        const wallet = await this.findOne(deleteWalletReq.address, deleteWalletReq.id);
        const [balance, count] = await Promise.all([
            this.blockchainComGateway.getBalance(deleteWalletReq.address),
            this.walletRepository.countBy({ address: deleteWalletReq.address }),
        ]);

        //We delete the wallet the database and then we proceed to remove the webhook
        await Promise.all([
            this.walletRepository.delete({ address: deleteWalletReq.address, userId: deleteWalletReq.id }),
            this.transactionWatcherService.unsubscribeAddress(deleteWalletReq.address),
        ]);

        if (count == 1) {
            // If count is 1 then this was the only user who had this wallet and so we can proceed with the transaction clean up,
            // the cleanup process can also be done asynchronously because we don't have to worry about UI issue because no users
            // will see those transactions anyways
            this.transactionsService.cleanup(deleteWalletReq.address).catch(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
        }
        return { ...wallet, balance };
    }
}
