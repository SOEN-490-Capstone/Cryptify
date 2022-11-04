import { InferType } from "yup";
import { getTransactionsSchema } from "../validations/get_transactions_schema";

export interface GetTransactionsRequest extends InferType<typeof getTransactionsSchema> {}
