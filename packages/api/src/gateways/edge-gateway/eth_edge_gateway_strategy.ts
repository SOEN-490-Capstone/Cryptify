import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { AbstractEdgeGatewayStrategy } from "@cryptify/api/src/gateways/edge-gateway/abstract_edge_gateway_strategy";

@Injectable()
export class EthEdgeGatewayStrategy extends AbstractEdgeGatewayStrategy {
    constructor(private configService: ConfigService) {
        const host = configService.get<string>("ETH_EDGE_HOST");
        const port = configService.get<string>("ETH_EDGE_PORT");
        super(`http://${host}:${port}`);
    }

    async createWallet(req: CreateWalletRequest): Promise<WalletWithBalance> {
        const path = `users/${req.userId}/wallets`;
        return this.request<WalletWithBalance>(Method.POST, {}, path, req);
    }

    async getWallets(req: GetWalletsRequest): Promise<WalletWithBalance[]> {
        const path = `users/${req.id}/wallets`;
        return this.request<WalletWithBalance[]>(Method.GET, {}, path, null);
    }
}