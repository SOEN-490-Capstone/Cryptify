import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { DeleteWalletRequest } from "@cryptify/common/src/requests/delete_wallet_request";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import { ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY } from "@cryptify/common/src/errors/error_messages";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { EdgeGatewayStrategyFactory } from "@cryptify/api/src/gateways/edge-gateway/edge_gateway_strategy_factory";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { UpdateWalletRequest } from "@cryptify/common/src/requests/update_wallet_request";

@Injectable()
export class WalletsService {
    constructor(private readonly edgeGatewayStrategyFactory: EdgeGatewayStrategyFactory) {}

    async create(req: CreateWalletRequest): Promise<WalletWithBalance> {
        if (req.currencyType != getCurrencyType(req.address)) {
            throw new BadRequestException(ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY(titleCase(req.currencyType)));
        }

        // Get the edge gateway strategy associated to the currency type in the request
        // then using this gateway create the wallet in the appropriate edge service
        const edgeGatewayStrategy = this.edgeGatewayStrategyFactory.get(req.currencyType);
        return edgeGatewayStrategy.createWallet(req);
    }

    async delete(req: DeleteWalletRequest): Promise<WalletWithBalance> {
        const edgeGatewayStrategy = this.edgeGatewayStrategyFactory.get(getCurrencyType(req.address));
        return edgeGatewayStrategy.deleteWallet(req);
    }

    async findAll(req: GetWalletsRequest): Promise<WalletWithBalance[]> {
        // Map through the currency types to build a list of strategies, then map through each strategy
        // and get the wallets from the associated edge service in parallel, finally flatten the 2D
        // array of wallets into a single array
        const strategies = Object.keys(CurrencyType).map((type) =>
            this.edgeGatewayStrategyFactory.get(CurrencyType[type]),
        );
        const walletsByType = await Promise.all(strategies.map((strategy) => strategy.getWallets(req)));
        return walletsByType.flat();
    }

    async update(req: UpdateWalletRequest): Promise<WalletWithBalance> {
        const edgeGatewayStrategy = this.edgeGatewayStrategyFactory.get(getCurrencyType(req.address));
        return edgeGatewayStrategy.updateWallet(req);
    }
}
