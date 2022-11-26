import { InferType } from "yup";
import { deleteWalletSchema } from "../validations/delete_wallet_schema";

export interface DeleteWalletRequest extends InferType<typeof deleteWalletSchema> {}
