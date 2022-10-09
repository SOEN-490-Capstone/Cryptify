import { request, Method } from "@cryptify/common/src/helpers/request";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";

@Injectable()
export class EthEdgeGateway {
    request: <T>(method: Method, path: string, body: any) => Promise<T>;
    constructor(private configService: ConfigService) {
        this.request = request(configService.get<string>("ETH_EDGE_HOST"), configService.get<string>("ETH_EDGE_PORT"));
    }

    async createWallet(req: CreateWalletRequest): Promise<WalletWithBalance> {
        const path = `user/${req.userId}/wallet`;
        return this.request<WalletWithBalance>(Method.POST, path, req);
    }

    async getWallets(req: GetWalletsRequest): Promise<Wallet[]> {
        const path = `users/${req.id}/wallets`;
        return this.request<Wallet[]>(Method.GET, path, null);
    }
}
