import { Body, Controller, Param, Post } from "@nestjs/common";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { Repository } from "typeorm";
import { Wallet } from "@cryptify/common/src/entities/wallet";

@Controller()
export class WalletsController {
    constructor() {}

    @Post("user/:id/wallet")
    async create(@Body() walletReq: CreateWalletRequest, @Param() params): Promise<any> {
        return { ...walletReq, ...params };
    }
}
