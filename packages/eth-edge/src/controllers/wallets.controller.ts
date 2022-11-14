import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletsService } from "@cryptify/eth-edge/src/services/wallets.service";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { getWalletsSchema } from "@cryptify/common/src/validations/get_wallets_schema";
import { DeleteWalletRequest } from "@cryptify/common/src/requests/delete_wallet_request";
import { deleteWalletSchema } from "@cryptify/common/src/validations/delete_wallet_schema";
import { stringify } from "querystring";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

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

    @Delete("/users/:UserId/deleteWallet")
    async delete(@Body() body: DeleteWalletRequest): Promise<void> {
        body.currencyType = CurrencyType.ETHEREUM;
        const deleteWalletReq = await useValidate(deleteWalletSchema, body);
        return this.walletsService.delete(deleteWalletReq.address, deleteWalletReq.userId);
    }
}
