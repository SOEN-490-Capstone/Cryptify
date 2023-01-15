import { Controller, UseGuards, Body, Post } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CanMutateResourceGuard } from "@cryptify/api/src/guards/can_mutate_resource.guard";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { updateUserSchema } from "@cryptify/common/src/validations/update_user_schema";
import { ReportsService } from "@cryptify/api/src/services/reports.service";
import { CreateTransactionHistoryReportRequest } from "@cryptify/common/src/requests/create_transaction_history_report_request";

@Controller()
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @UseGuards(JwtAuthGuard, CanMutateResourceGuard)
    @Post("users/:id/reports/transaction-history")
    async create(@Body() body: CreateTransactionHistoryReportRequest): Promise<void> {
        const createReportRequest = await useValidate(updateUserSchema, body);
        await this.reportsService.generateTransactionHistory(createReportRequest);
    }
}
