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

    async create(userId: number, address: string, name: string): Promise<InsertResult> {
        return this.walletRepository.insert({ userId, address, name });
    }
}
