import { InferType } from "yup";
import { deleteWalletSchema } from "../validations/delete_wallet_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DeleteWalletRequest extends InferType<typeof deleteWalletSchema> {}
