import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { AbstractEdgeGatewayStrategy } from "@cryptify/api/src/gateways/edge-gateway/abstract_edge_gateway_strategy";

@Injectable()
export class BtcEdgeGatewayStrategy extends AbstractEdgeGatewayStrategy {
    constructor(private configService: ConfigService) {
        const host = configService.get<string>("BTC_EDGE_HOST");
        const port = configService.get<string>("BTC_EDGE_PORT");
        super(`http://${host}:${port}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createWallet(_req: CreateWalletRequest): Promise<WalletWithBalance> {
        throw new Error();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getWallets(_req: GetWalletsRequest): Promise<WalletWithBalance[]> {
        return [];
    }
}
