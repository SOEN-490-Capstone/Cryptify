import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT } from "@cryptify/common/src/errors/error_messages";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { AlchemyNodeService } from "@cryptify/eth-edge/src/services/alchemy_node.service";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { titleCase } from "@cryptify/common/src/helpers/string_utils";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
        private alchemyNodeService: AlchemyNodeService,
    ) {}

    async create(createWalletReq: CreateWalletRequest): Promise<WalletWithBalance> {
        if (await this.findOne(createWalletReq.address, createWalletReq.userId)) {
            throw new BadRequestException(
                ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT(titleCase(createWalletReq.currencyType)),
            );
        }

        const reqWallet = this.walletRepository.create(createWalletReq);
        await this.walletRepository.insert(reqWallet);

        const balance = await this.alchemyNodeService.getBalance(createWalletReq.address);
        const wallet = await this.findOne(createWalletReq.address, createWalletReq.userId);
        return { ...wallet, balance };
    }

    async findOne(address: string, userId: number): Promise<Wallet> {
        return this.walletRepository.findOne({ where: { address, userId } });
    }

    async findAll(userId: number): Promise<Wallet[]> {
        return this.walletRepository.find({ where: { currencyType: CurrencyType.ETHEREUM, userId } });
    }
}
