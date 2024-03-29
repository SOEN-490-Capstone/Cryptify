import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
    ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT,
    ERROR_WALLET_NAME_ALREADY_ADDED_TO_ACCOUNT,
} from "@cryptify/common/src/errors/error_messages";
import { Wallet, WalletBuilder } from "@cryptify/common/src/domain/entities/wallet";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { AlchemyNodeServiceFacade } from "@cryptify/eth-edge/src/services/alchemy_node_facade.service";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { TransactionsService } from "@cryptify/eth-edge/src/services/transactions.service";
import { AlchemyNodeGateway } from "@cryptify/eth-edge/src/gateways/alchemy_node.gateway";
import { zip } from "@cryptify/common/src/utils/function_utils";
import { DeleteWalletRequest } from "@cryptify/common/src/requests/delete_wallet_request";
import { UpdateWalletRequest } from "@cryptify/common/src/requests/update_wallet_request";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
        private alchemyNodeServiceFacade: AlchemyNodeServiceFacade,
        @Inject(forwardRef(() => TransactionsService))
        private transactionsService: TransactionsService,
        private alchemyNodeGateway: AlchemyNodeGateway,
    ) {}

    async create(req: CreateWalletRequest): Promise<WalletWithBalance> {
        if (await this.findOne(req.address, req.userId)) {
            throw new BadRequestException(ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT(titleCase(req.currencyType)));
        }

        if (await this.walletRepository.findOneBy({ name: req.name, userId: req.userId })) {
            throw new BadRequestException(ERROR_WALLET_NAME_ALREADY_ADDED_TO_ACCOUNT);
        }

        const reqWallet = this.walletRepository.create(req);
        await this.walletRepository.insert(reqWallet);

        // Parallelizing the promises here are fine since there are no shared resources between them
        // ideally there is some kind of rollback mechanism in place such that if any of these fail
        // everything will be reset to before the request started including removing the wallet that
        // was just inserted
        const [balance] = await Promise.all([
            this.alchemyNodeServiceFacade.getBalance(reqWallet.address),
            this.transactionsService.backfillTransactions(reqWallet.address),
            this.alchemyNodeGateway.updateWebhookAddresses([reqWallet.address], []),
        ]);

        return new WalletBuilder()
            .setAddress(req.address)
            .setName(req.name)
            .setUserId(req.userId)
            .setBalance(balance)
            .build();
    }

    async findOne(address: string, userId: number): Promise<Wallet> {
        return this.walletRepository.findOne({ where: { address, userId } });
    }

    async findAll(userId: number): Promise<WalletWithBalance[]> {
        const wallets = await this.walletRepository.find({ where: { currencyType: CurrencyType.ETHEREUM, userId } });
        // For each wallet owned by the user get the wallets balance from Alchemy, we can parallelize these requests
        // to speed up the processing time
        const balances = await Promise.all(
            wallets.map(async (wallet) => this.alchemyNodeServiceFacade.getBalance(wallet.address)),
        );
        // Once all the balances have been retrieved zip the lists together and map through them to construct the final
        // object, Promise.all will return the values in the same order we inputted them meaning the wallets and balances
        // will line up when we zip them
        return zip(wallets, balances).map(([wallet, balance]) =>
            new WalletBuilder().setWallet(wallet).setBalance(balance).build(),
        );
    }

    async delete(deleteWalletReq: DeleteWalletRequest): Promise<WalletWithBalance> {
        const wallet = await this.findOne(deleteWalletReq.address, deleteWalletReq.id);
        const [balance, count] = await Promise.all([
            this.alchemyNodeServiceFacade.getBalance(deleteWalletReq.address),
            this.walletRepository.countBy({ address: deleteWalletReq.address }),
        ]);

        // We delete the wallet the database and then we proceed to remove the webhook from alchemy
        await Promise.all([
            this.walletRepository.delete({ address: deleteWalletReq.address, userId: deleteWalletReq.id }),
            this.alchemyNodeGateway.updateWebhookAddresses([], [deleteWalletReq.address]),
        ]);

        if (count == 1) {
            // If count is 1 then this was the only user who had this wallet and so we can proceed with the transaction clean up,
            // the cleanup process can also be done asynchronously because we don't have to worry about UI issue because no users
            // will see those transactions anyways
            this.transactionsService.cleanup(deleteWalletReq.address).catch(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
        }

        return new WalletBuilder().setWallet(wallet).setBalance(balance).build();
    }

    async update(updateWalletReq: UpdateWalletRequest): Promise<WalletWithBalance> {
        const wallet = await this.findOne(updateWalletReq.address, updateWalletReq.userId);
        wallet.name = updateWalletReq.name;
        const [, balance] = await Promise.all([
            this.walletRepository.save(wallet),
            this.alchemyNodeServiceFacade.getBalance(updateWalletReq.address),
        ]);

        return new WalletBuilder().setWallet(wallet).setBalance(balance).build();
    }
}
