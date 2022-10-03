import { Body, Controller, Param, Post } from "@nestjs/common";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";

@Controller()
export class WalletsController {
    @Post("/user/:id/wallet")
    async create(@Body() body: CreateWalletRequest, @Param() params): Promise<any> {
        return { test: params.id };
    }
}
