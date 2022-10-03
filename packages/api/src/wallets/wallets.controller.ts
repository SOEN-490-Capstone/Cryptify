import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { WalletsService } from "@cryptify/api/src/wallets/wallets.service";
import { JwtAuthGuard } from "@cryptify/api/src/authentication/gaurds/jwt-auth.guard";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { useValidate } from "@cryptify/api/src/hooks/use_validate";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";
import { createWallet } from "../gateways/eth_edge_requests";

@Controller()
export class WalletsController {
    constructor(private walletsService: WalletsService) {}

    @Post("/user/:id/wallet")
    @UseGuards(JwtAuthGuard)
    async create(@Body() body: CreateWalletRequest, @Param() params): Promise<any> {
        const createWalletReq = await useValidate(createWalletSchema, { ...body, userId: params.id });

        return createWallet(createWalletReq);
    }
}
