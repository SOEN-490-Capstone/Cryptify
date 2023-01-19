import { AbstractApiGateway } from "./abstract_api_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { CreateTransactionHistoryReportRequest } from "@cryptify/common/src/requests/create_transaction_history_report_request";

export class ReportsGateway extends AbstractApiGateway {
    constructor() {
        super();
    }

    async createTransactionHistoryReport(req: CreateTransactionHistoryReportRequest, token: string): Promise<void> {
        const path = `users/${req.userId}/reports/transaction-history`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        await this.request<void>(Method.POST, headers, path, req);
    }
}
