import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { AbstractEdgeGatewayStrategy } from "@cryptify/api/src/gateways/edge-gateway/abstract_edge_gateway_strategy";
import { GetTransactionsRequest } from "@cryptify/common/src/requests/get_transaction_request";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";

@Injectable()
export class BtcEdgeGatewayStrategy extends AbstractEdgeGatewayStrategy {
    constructor(private configService: ConfigService) {
        const host = configService.get<string>("BTC_EDGE_HOST");
        const port = configService.get<string>("BTC_EDGE_PORT");
        super(`http://${host}:${port}`);
    }

    async createWallet(req: CreateWalletRequest): Promise<WalletWithBalance> {
        const path = `users/${req.userId}/wallets`;
        return this.request<WalletWithBalance>(Method.POST, {}, path, req);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getWallets(_req: GetWalletsRequest): Promise<WalletWithBalance[]> {
        return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getTransactions(_req: GetTransactionsRequest): Promise<Transaction[]> {
        return [];
    }
}
