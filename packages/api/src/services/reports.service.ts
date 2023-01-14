import { Injectable } from "@nestjs/common";
import { CreateTransactionHistoryReportRequest } from "@cryptify/common/src/requests/create_transaction_history_report_request";

@Injectable()
export class ReportsService {
    constructor() {}

    async generateTransactionHistory(createReportRequest: CreateTransactionHistoryReportRequest): Promise<void> {}
}
