import { InferType } from "yup";
import { getTransactionsSchema } from "../validations/get_transactions_schema";

export type GetTransactionsRequest = InferType<typeof getTransactionsSchema>;
