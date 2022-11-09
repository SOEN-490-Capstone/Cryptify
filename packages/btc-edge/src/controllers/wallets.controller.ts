import { Body, Controller, Post } from "@nestjs/common";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletsService } from "../services/wallets.service";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";

@Controller()
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    @Post("users/:id/wallets")
    async create(@Body() body: CreateWalletRequest): Promise<WalletWithBalance> {
        const createWalletReq = await useValidate(createWalletSchema, body);
        return this.walletsService.create(createWalletReq);
    }
}
