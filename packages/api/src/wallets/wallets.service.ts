import { Injectable } from "@nestjs/common";
import { Wallet } from "@cryptify/common/src/entities/wallet";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
    ) {}

    async create(userId: number, walletAddress: string, walletName: string): Promise<InsertResult> {
        return this.walletRepository.insert({ userId, walletAddress, walletName });
    }
}
