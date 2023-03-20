import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletsService } from "../services/wallets.service";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { getWalletsSchema } from "@cryptify/common/src/validations/get_wallets_schema";
import { DeleteWalletRequest } from "@cryptify/common/src/requests/delete_wallet_request";
import { deleteWalletSchema } from "@cryptify/common/src/validations/delete_wallet_schema";
import { UpdateWalletRequest } from "@cryptify/common/src/requests/update_wallet_request";
import { updateWalletSchema } from "@cryptify/common/src/validations/update_wallet_schema";

@Controller()
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    @Post("users/:id/wallets")
    async create(@Body() body: CreateWalletRequest): Promise<WalletWithBalance> {
        const createWalletReq = await useValidate(createWalletSchema, body);
        return this.walletsService.create(createWalletReq);
    }

    @Get("users/:id/wallets")
    async findAll(@Param() params: GetWalletsRequest): Promise<WalletWithBalance[]> {
        const getWalletReq = await useValidate(getWalletsSchema, params);
        return this.walletsService.findAll(getWalletReq.id);
    }

    @Delete("/users/:id/wallets/:address")
    async delete(@Param() params: DeleteWalletRequest): Promise<WalletWithBalance> {
        const deleteWalletReq = await useValidate(deleteWalletSchema, params);
        return this.walletsService.delete(deleteWalletReq);
    }

    @Put("/users/:id/wallets/:address")
    async update(@Body() body: UpdateWalletRequest): Promise<WalletWithBalance> {
        const updateWalletReq = await useValidate(updateWalletSchema, body);
        return this.walletsService.update(updateWalletReq);
    }
}
