import { Body, Controller, Post } from "@nestjs/common";
import { TransactionsService } from "@cryptify/eth-edge/src/services/transactions.service";
import { AddressActivityEvent } from "@cryptify/eth-edge/src/types/address_activity_event";

@Controller()
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post("/transactions")
    async create(@Body() body: AddressActivityEvent): Promise<void> {
        this.transactionsService.handleAddressActivityEvent(body);
    }
}
