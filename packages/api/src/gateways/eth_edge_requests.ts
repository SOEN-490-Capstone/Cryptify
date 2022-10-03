import { ApiRequest, Method } from "@cryptify/common/src/requests/api_request";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { Wallet } from "@cryptify/common/src/entities/wallet";

const apiRequest = new ApiRequest(process.env.ETH_EDGE_API_URL, process.env.ETH_EDGE_API_PORT);

export async function createWallet(walletReq: CreateWalletRequest): Promise<Wallet> {
    return await apiRequest.request<Wallet>(Method.POST, `user/${walletReq.userId}/wallet`, walletReq);
}
