import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";
import { JwtAuthGuard } from "@cryptify/api/src/gaurds/jwt-auth.guard";
import { WalletsService } from "@cryptify/api/src/services/wallets.service";
import { CanMutateResourceGuard } from "@cryptify/api/src/gaurds/can_mutate_resource.guard";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { getWalletsSchema } from "@cryptify/common/src/validations/get_wallets_schema";
import { CanAccessResourceGuard } from "@cryptify/api/src/gaurds/can_access_resource.guard";

@Controller()
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    @UseGuards(JwtAuthGuard, CanMutateResourceGuard)
    @Post("/users/:id/wallets")
    async create(@Body() body: CreateWalletRequest): Promise<WalletWithBalance> {
        const createWalletReq = await useValidate(createWalletSchema, body);
        return this.walletsService.create(createWalletReq);
    }

    @UseGuards(JwtAuthGuard, CanAccessResourceGuard)
    @Get("/users/:id/wallets")
    async findAll(@Param() params: GetWalletsRequest): Promise<WalletWithBalance[]> {
        const getWalletsReq = await useValidate(getWalletsSchema, params);

        return this.walletsService.findAll(getWalletsReq);
    }
}
