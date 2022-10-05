import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT } from "@cryptify/common/src/errors/error_messages";
import { Wallet } from "@cryptify/common/src/entities/wallet";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
    ) {}

    async create(createWalletReq: CreateWalletRequest): Promise<Wallet> {
        if (await this.findOne(createWalletReq.address, createWalletReq.userId)) {
            throw new BadRequestException(ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT);
        }

        const createdUser = this.walletRepository.create(createWalletReq);
        await this.walletRepository.insert(createdUser);

        return this.findOne(createWalletReq.address, createWalletReq.userId);
    }

    async findOne(address: string, userId: number): Promise<Wallet> {
        return this.walletRepository.findOne({ where: { address, userId } });
    }
}
