import { InferType } from "yup";
import { createTransactionHistoryReportSchema } from "@cryptify/common/src/validations/create_transaction_history_report_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateTransactionHistoryReportRequest extends InferType<typeof createTransactionHistoryReportSchema> {}
