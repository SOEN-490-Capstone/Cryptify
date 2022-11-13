import { Controller, Get, Param } from "@nestjs/common";
import { TransactionsService } from "@cryptify/btc-edge/src/services/transactions_service";
import { GetTransactionsRequest } from "@cryptify/common/src/requests/get_transaction_request";
import { getTransactionsSchema } from "@cryptify/common/src/validations/get_transactions_schema";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";

@Controller()
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get("users/:id/transactions")
    async findAll(@Param() params: GetTransactionsRequest): Promise<Transaction[]> {
        const getTransactionReq = await useValidate(getTransactionsSchema, params);
        return this.transactionsService.findAll(getTransactionReq.id);
    }
}
