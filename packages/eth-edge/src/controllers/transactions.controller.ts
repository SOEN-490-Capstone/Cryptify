import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TransactionsService } from "@cryptify/eth-edge/src/services/transactions.service";
import { AddressActivityEvent } from "@cryptify/eth-edge/src/types/address_activity_event";
import { GetTransactionsRequest } from "@cryptify/common/src/requests/get_transaction_request";
import { getTransactionsSchema } from "@cryptify/common/src/validations/get_transactions_schema";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";

@Controller()
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post("/transactions")
    async create(@Body() body: AddressActivityEvent): Promise<void> {
        // Don't return the promise or await it so the request resolves immediately
        // we can handle everything async and return 201 back to alchemy right away
        this.transactionsService.handleAddressActivityEvent(body);
    }

    @Get("users/:id/transactions")
    async findAll(@Param() params: GetTransactionsRequest): Promise<Transaction[]> {
        const getTransactionReq = await useValidate(getTransactionsSchema, params);
        return this.transactionsService.findAll(getTransactionReq.id);
    }
}
