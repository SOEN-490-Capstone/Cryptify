import { Body, Controller, Post } from "@nestjs/common";
import { TransactionsService } from "@cryptify/eth-edge/src/services/transactions.service";
import { AddressActivityEvent } from "@cryptify/eth-edge/src/types/address_activity_event";

@Controller()
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post("/transactions")
    async create(@Body() body: AddressActivityEvent): Promise<void> {
        // Don't return the promise or await it so the request resolves immediately
        // we can handle everything async and return 201 back to alchemy right away
        this.transactionsService.handleAddressActivityEvent(body);
        return;
    }
}
