import { BadRequestException, Injectable } from "@nestjs/common";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { EthEdgeGateway } from "@cryptify/api/src/gateways/eth_edge_gateway";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { getCurrencyType } from "@cryptify/common/src/helpers/getCurrencyType";
import { ERROR_WALLET_ADDRESS_FOR_CURRENCY } from "@cryptify/common/src/errors/error_messages";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
        private readonly ethEdgeGateway: EthEdgeGateway,
    ) {}

    async create(req: CreateWalletRequest): Promise<WalletWithBalance> {
        if (req.currencyType != getCurrencyType(req.address))
            throw new BadRequestException(ERROR_WALLET_ADDRESS_FOR_CURRENCY);

        return this.ethEdgeGateway.createWallet<WalletWithBalance>(req);
    }
}
