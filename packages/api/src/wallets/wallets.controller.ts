import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { WalletsService } from "@cryptify/api/src/wallets/wallets.service";
import { InsertResult } from "typeorm";
import { JwtAuthGuard } from "@cryptify/api/src/authentication/gaurds/jwt-auth.guard";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { useValidate } from "@cryptify/api/src/hooks/use_validate";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";

@Controller("wallets")
export class WalletsController {
    constructor(private walletsService: WalletsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() body: CreateWalletRequest, @Request() req): Promise<InsertResult> {
        const createWalletReq = await useValidate(createWalletSchema, body);

        return this.walletsService.create(req.user, createWalletReq);
    }
}
