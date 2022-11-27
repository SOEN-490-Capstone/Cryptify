import { InferType } from "yup";
import { getTransactionsSchema } from "../validations/get_transactions_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetTransactionsRequest extends InferType<typeof getTransactionsSchema> {}
