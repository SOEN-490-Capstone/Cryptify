import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
    ) {}

    async create(createWalletReq: CreateWalletRequest): Promise<WalletWithBalance> {
        return null;
    }
}
