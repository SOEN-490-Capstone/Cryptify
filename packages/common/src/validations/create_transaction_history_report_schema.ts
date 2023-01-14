import * as yup from "yup";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

enum FileType {
    CSV = "CSV",
}

export const createTransactionHistoryReportSchema = yup.object({
    userId: yup.number().required(),
    currencyType: yup.mixed<CurrencyType>().oneOf(Object.values(CurrencyType)).required(),
    transactionsIn: yup.boolean(),
    transactionsOut: yup.boolean(),
    startDate: yup.date().nullable(),
    endDate: yup.date().nullable(),
    fileType: yup.mixed<FileType>().oneOf(Object.values(FileType)).required(),
});
