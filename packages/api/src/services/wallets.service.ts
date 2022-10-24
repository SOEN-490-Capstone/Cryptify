import { BadRequestException, Injectable } from "@nestjs/common";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import { ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY } from "@cryptify/common/src/errors/error_messages";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { EdgeGatewayStrategyFactory } from "@cryptify/api/src/gateways/edge-gateway/edge_gateway_strategy_factory";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

@Injectable()
export class WalletsService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
        private readonly edgeGatewayStrategyFactory: EdgeGatewayStrategyFactory,
    ) {}

    async create(req: CreateWalletRequest): Promise<WalletWithBalance> {
        if (req.currencyType != getCurrencyType(req.address)) {
            throw new BadRequestException(ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY(titleCase(req.currencyType)));
        }

        // Get the edge gateway strategy associated to the currency type in the request
        // then using this gateway create the wallet in the appropriate edge service
        const edgeGatewayStrategy = this.edgeGatewayStrategyFactory.get(req.currencyType);
        return edgeGatewayStrategy.createWallet(req);
    }

    async findAll(req: GetWalletsRequest): Promise<WalletWithBalance[]> {
        // Map through the currency types to build a list of promises that will each resolve
        // to a list of wallets, the 2D array can be flattened to have all the wallets on the same level
        const walletPromises = Object.keys(CurrencyType).map((type) =>
            this.edgeGatewayStrategyFactory.get(CurrencyType[type]).getWallets(req),
        );
        const walletsByType = await Promise.all(walletPromises);
        return walletsByType.flat();
    }
}
