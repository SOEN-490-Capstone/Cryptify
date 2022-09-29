import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { WalletsService } from "@cryptify/api/src/wallets/wallets.service";
import { Wallet } from "@cryptify/common/src/entities/wallet";
import { InsertResult } from "typeorm";
import { JwtAuthGuard } from "@cryptify/api/src/authentication/gaurds/jwt-auth.guard";

@Controller("wallets")
export class WalletsController {
    constructor(private walletsService: WalletsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() body: Wallet, @Request() req): Promise<InsertResult> {
        return this.walletsService.create(req.user, body.address, body.name);
    }
}
