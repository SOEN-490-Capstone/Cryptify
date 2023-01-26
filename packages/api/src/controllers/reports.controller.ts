import { Controller, UseGuards, Body, Post } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CanMutateResourceGuard } from "@cryptify/api/src/guards/can_mutate_resource.guard";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { ReportsService } from "@cryptify/api/src/services/reports.service";
import { CreateTransactionHistoryReportRequest } from "@cryptify/common/src/requests/create_transaction_history_report_request";
import {
    createTransactionHistoryReportSchema
} from "@cryptify/common/src/validations/create_transaction_history_report_schema";

@Controller()
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @UseGuards(JwtAuthGuard, CanMutateResourceGuard)
    @Post("/users/:id/reports/transaction-history")
    async create(@Body() body: CreateTransactionHistoryReportRequest) {
        const createReportRequest = await useValidate(createTransactionHistoryReportSchema, body);
        await this.reportsService.generateTransactionHistory(createReportRequest);
        // Nestjs void return conflicts with the React Native fetch API and causes an EOF syntax error, this is just a
        // workaround
        return {};
    }
}
