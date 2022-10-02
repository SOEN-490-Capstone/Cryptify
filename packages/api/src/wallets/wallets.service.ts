import { Injectable } from "@nestjs/common";
import { Wallet } from "@cryptify/common/src/entities/wallet";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { whatCryptoCurrencyType } from "@cryptify/api/src/wallets/helpers/whatCryptoCurrencyType";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
    ) {}

    async create(userId: number, createWalletReq: CreateWalletRequest): Promise<InsertResult> {
        const createdWallet = this.walletRepository.create({
            ...createWalletReq,
            currencyType: whatCryptoCurrencyType(createWalletReq.address),
            userId,
        });

        return this.walletRepository.insert(createdWallet);
    }
}
