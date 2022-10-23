import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { AbstractApiGateway } from "./abstract_api_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";

export class WalletsGateway extends AbstractApiGateway {
    constructor() {
        super();
    }

    async createWallet(req: CreateWalletRequest, token: JwtToken): Promise<WalletWithBalance> {
        const path = `users/${req.userId}/wallets`;
        const headers = {
            Authorization: `Bearer ${token.accessToken}`,
        };

        return this.request<WalletWithBalance>(Method.POST, headers, path, req);
    }

    async findAllWallets(req: GetWalletsRequest, token: JwtToken): Promise<WalletWithBalance[]> {
        const path = `users/${req.id}/wallets`;
        const headers = {
            Authorization: `Bearer ${token.accessToken}`,
        };

        return this.request<WalletWithBalance[]>(Method.GET, headers, path, null);
    }
}
