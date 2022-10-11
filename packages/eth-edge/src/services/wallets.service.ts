import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
    ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT,
    ERROR_WALLET_NAME_ALREADY_ADDED_TO_ACCOUNT,
} from "@cryptify/common/src/errors/error_messages";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { AlchemyNodeService } from "@cryptify/eth-edge/src/services/alchemy_node.service";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { titleCase } from "@cryptify/common/src/helpers/string_utils";
import { TransactionsService } from "@cryptify/eth-edge/src/services/transactions.service";
import { AlchemyNodeGateway } from "@cryptify/eth-edge/src/gateways/alchemy_node.gateway";
import {zip} from "@cryptify/common/src/helpers/function_utils";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
        private alchemyNodeService: AlchemyNodeService,
        private transactionsService: TransactionsService,
        private alchemyNodeGateway: AlchemyNodeGateway,
    ) {}

    async create(createWalletReq: CreateWalletRequest): Promise<WalletWithBalance> {
        if (await this.findOne(createWalletReq.address, createWalletReq.userId)) {
            throw new BadRequestException(
                ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT(titleCase(createWalletReq.currencyType)),
            );
        }

        if (await this.walletRepository.findOneBy({ name: createWalletReq.name, userId: createWalletReq.userId })) {
            throw new BadRequestException(ERROR_WALLET_NAME_ALREADY_ADDED_TO_ACCOUNT);
        }

        const reqWallet = this.walletRepository.create(createWalletReq);
        await this.walletRepository.insert(reqWallet);

        // Parallelizing the promises here are fine since there are no shared resources between them
        // ideally there is some kind of rollback mechanism in place such that if any of these fail
        // everything will be reset to before the request started including removing the wallet that
        // was just inserted
        const [balance] = await Promise.all([
            this.alchemyNodeService.getBalance(reqWallet.address),
            this.transactionsService.backfillTransactions(reqWallet.address),
            this.alchemyNodeGateway.updateWebhookAddresses([reqWallet.address], []),
        ]);

        const wallet = await this.findOne(createWalletReq.address, createWalletReq.userId);
        return { ...wallet, balance };
    }

    async findOne(address: string, userId: number): Promise<Wallet> {
        return this.walletRepository.findOne({ where: { address, userId } });
    }

    async findAll(userId: number): Promise<WalletWithBalance[]> {
        const wallets = await this.walletRepository.find({ where: { currencyType: CurrencyType.ETHEREUM, userId } });
        // For each wallet owned by the user get the wallets balance from Alchemy, we can parallelize these requests
        // to speed up the processing time
        const balances = await Promise.all(wallets.map(async (wallet) => this.alchemyNodeService.getBalance(wallet.address)));
        // Once all the balances have been retrieved zip the lists together and map through them to construct the final
        // object, Promise.all will return the values in the same order we inputted them meaning the wallets and balances
        // will line up when we zip them
        return zip(wallets, balances).map(([wallet, balance]) => ({
            ...wallet,
            balance
        }));
    }
}
