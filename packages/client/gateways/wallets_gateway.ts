import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { Method, request } from "./request";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";

async function createWallet(req: CreateWalletRequest, token: JwtToken): Promise<WalletWithBalance> {
    const path = `users/${req.userId}/wallets`;
    const headers = {
        Authorization: `Bearer ${token.accessToken}`,
    };

    return request<WalletWithBalance>(Method.POST, headers, path, req);
}

async function findAllWallets(req: GetWalletsRequest, token: JwtToken): Promise<WalletWithBalance[]> {
    const path = `users/${req.id}/wallets`;
    const headers = {
        Authorization: `Bearer ${token.accessToken}`,
    };

    return request<WalletWithBalance[]>(Method.GET, headers, path, null);
}

export default {
    createWallet,
    findAllWallets,
};
