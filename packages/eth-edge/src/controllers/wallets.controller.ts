import { Body, Controller, Post } from "@nestjs/common";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletsService } from "@cryptify/eth-edge/src/services/wallets.service";
import { useValidate } from "@cryptify/common/hooks/use_validate";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";

@Controller()
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) {}

    @Post("user/:id/wallet")
    async create(@Body() body: CreateWalletRequest): Promise<any> {
        const createWalletReq = await useValidate(createWalletSchema, body);

        return this.walletsService.create(createWalletReq);
    }
}
