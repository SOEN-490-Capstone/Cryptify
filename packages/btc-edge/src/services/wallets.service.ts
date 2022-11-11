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
import { SoChainGateway } from "@cryptify/btc-edge/src/gateways/so_chain_gateway";
import { TransactionsService } from "@cryptify/btc-edge/src/services/transactions_service";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
        private readonly transactionsService: TransactionsService,
        private readonly soChainGateway: SoChainGateway,
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

        // Parallelize getting the wallet balance and backfilling the transactions in the db
        // is fine since there are no shared resources, once everything resolves the wallet
        // with the balance will be returned
        const [balance] = await Promise.all([
            this.soChainGateway.getBalance(address),
            this.transactionsService.backfillTransactions(address),
        ]);

        const wallet = await this.walletRepository.findOneBy({
            address,
            userId,
        });
        return { ...wallet, balance };
    }
}
