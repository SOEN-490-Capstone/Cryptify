import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { JwtAuthGuard } from "@cryptify/api/src/guards/jwt-auth.guard";
import { GetTransactionsRequest } from "@cryptify/common/src/requests/get_transaction_request";
import { getTransactionsSchema } from "@cryptify/common/src/validations/get_transactions_schema";
import { CanAccessResourceGuard } from "@cryptify/api/src/guards/can_access_resource.guard";
import { TransactionsService } from "../services/transactions.service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

@Controller()
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @UseGuards(JwtAuthGuard, CanAccessResourceGuard)
    @Get("/users/:id/transactions")
    async findAll(@Param() params: GetTransactionsRequest): Promise<Transaction[]> {
        const getTransactionsReq = await useValidate(getTransactionsSchema, params);

        return this.transactionsService.findAll(getTransactionsReq);
    }
}
