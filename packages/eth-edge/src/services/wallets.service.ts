import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT } from "@cryptify/common/src/errors/error_messages";
import { Wallet } from "@cryptify/common/src/entities/wallet";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { AlchemyNodeService } from "@cryptify/eth-edge/src/services/alchemy_node.service";
import { walletWithBalance } from "@cryptify/common/src/types/wallet_with_balance";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
        private alchemyNodeService: AlchemyNodeService,
    ) {}

    async create(createWalletReq: CreateWalletRequest): Promise<walletWithBalance> {
        if (await this.findOne(createWalletReq.address, createWalletReq.userId)) {
            throw new BadRequestException(ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT);
        }

        const wallet = this.walletRepository.create(createWalletReq);
        await this.walletRepository.insert(wallet);
        const balance = await this.alchemyNodeService.getBalance(createWalletReq.address);
        return { ...(await this.findOne(createWalletReq.address, createWalletReq.userId)), balance };
    }

    async findOne(address: string, userId: number): Promise<Wallet> {
        return this.walletRepository.findOne({ where: { address, userId } });
    }
}
