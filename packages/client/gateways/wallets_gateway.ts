import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { Method, request } from "./request";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";

async function createWallet(req: CreateWalletRequest, token: JwtToken): Promise<WalletWithBalance> {
    const path = `users/${req.userId}/wallets`;
    const headers = {
        Authorization: `Bearer ${token.accessToken}`,
    };

    return request<WalletWithBalance>(Method.POST, headers, path, req);
}

export default {
    createWallet,
};
