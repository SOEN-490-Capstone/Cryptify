import * as yup from "yup";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

export enum FileType {
    CSV = "CSV",
}

export const createTransactionHistoryReportSchema = yup.object({
    userId: yup.number().required(),
    walletAddress: yup.string().required("Enter a wallet address."),
    currencyType: yup.mixed<CurrencyType>().oneOf(Object.values(CurrencyType)).required(),
    transactionsIn: yup.boolean(),
    transactionsOut: yup.boolean(),
    startDate: yup.date(),
    endDate: yup.date(),
    fileType: yup.mixed<FileType>().oneOf(Object.values(FileType)).required(),
});
