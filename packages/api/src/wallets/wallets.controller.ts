import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";
import { JwtAuthGuard } from "@cryptify/api/src/authentication/gaurds/jwt-auth.guard";
import { WalletsService } from "@cryptify/api/src/wallets/wallets.service";
import { AuthorizationGuard } from "@cryptify/api/src/wallets/guards/authorization.guard";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { getWalletsSchema } from "@cryptify/common/src/validations/get_wallets_schema";

@Controller()
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    @Post("/user/:id/wallet")
    @UseGuards(JwtAuthGuard, AuthorizationGuard)
    async create(@Body() body: CreateWalletRequest): Promise<WalletWithBalance> {
        const createWalletReq = await useValidate(createWalletSchema, body);
        return this.walletsService.create(createWalletReq);
    }

    @Get("/users/:id/wallets")
    @UseGuards(JwtAuthGuard, AuthorizationGuard)
    async findAll(@Param() param: GetWalletsRequest): Promise<Wallet[]> {
        const getWalletsReq = await useValidate(getWalletsSchema, param);

        return this.walletsService.findAll(getWalletsReq);
    }
}
