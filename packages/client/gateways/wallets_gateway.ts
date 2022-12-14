import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { DeleteWalletRequest } from "@cryptify/common/src/requests/delete_wallet_request";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { AbstractApiGateway } from "./abstract_api_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";

export class WalletsGateway extends AbstractApiGateway {
    constructor() {
        super();
    }

    async createWallet(req: CreateWalletRequest, token: string): Promise<WalletWithBalance> {
        const path = `users/${req.userId}/wallets`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<WalletWithBalance>(Method.POST, headers, path, req);
    }

    async findAllWallets(req: GetWalletsRequest, token: string): Promise<WalletWithBalance[]> {
        const path = `users/${req.id}/wallets`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<WalletWithBalance[]>(Method.GET, headers, path, null);
    }

    async deleteWallet(req: DeleteWalletRequest, token: string): Promise<WalletWithBalance> {
        const path = `users/${req.id}/wallets/${req.address}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<WalletWithBalance>(Method.DELETE, headers, path, null);
    }
}
