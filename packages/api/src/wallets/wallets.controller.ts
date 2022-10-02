import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { WalletsService } from "@cryptify/api/src/wallets/wallets.service";
import { InsertResult } from "typeorm";
import { JwtAuthGuard } from "@cryptify/api/src/authentication/gaurds/jwt-auth.guard";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { useValidate } from "@cryptify/api/src/hooks/use_validate";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";
import { whatCryptoCurrencyType } from "@cryptify/api/src/wallets/helpers/whatCryptoCurrencyType";
import { Wallet } from "@cryptify/common/src/entities/wallet";

@Controller("wallets")
export class WalletsController {
    constructor(private walletsService: WalletsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() body: CreateWalletRequest, @Request() req): Promise<InsertResult> {
        console.log(req);

        const createWalletReq = await useValidate(createWalletSchema, body);
        const wallet: Wallet = {
            ...createWalletReq,
            currencyType: whatCryptoCurrencyType(createWalletReq.address),
            userId: req.user,
            user: null,
        };

        return this.walletsService.create(wallet);
    }
}
