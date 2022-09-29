import { Body, Controller, Post } from "@nestjs/common";
import { WalletsService } from "@cryptify/api/src/wallets/wallets.service";
import { Wallet } from "@cryptify/common/src/entities/wallet";
import { InsertResult } from "typeorm";

@Controller("wallets")
export class WalletsController {
    constructor(private walletsService: WalletsService) {}

    @Post()
    async create(@Body() body: Wallet): Promise<InsertResult> {
        return this.walletsService.create(body.userId, body.walletAddress, body.walletName);
    }
}
