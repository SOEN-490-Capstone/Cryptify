import { Injectable } from "@nestjs/common";
import { Wallet } from "@cryptify/common/src/entities/wallet";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { EthEdgeRequest } from "@cryptify/api/src/gateways/eth_edge_request";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
        private readonly ethEdgeRequest: EthEdgeRequest,
    ) {}

    async create(req: CreateWalletRequest): Promise<InsertResult> {
        return this.ethEdgeRequest.createWallet(req);
    }
}
