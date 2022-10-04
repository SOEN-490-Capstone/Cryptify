import { Body, Controller, Param, Post } from "@nestjs/common";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";

@Controller("wallets")
export class WalletsController {
    @Post("user/:id/wallet")
    async create(@Body() walletReq: CreateWalletRequest, @Param() params): Promise<any> {
        return { ...walletReq, ...params };
    }
}
