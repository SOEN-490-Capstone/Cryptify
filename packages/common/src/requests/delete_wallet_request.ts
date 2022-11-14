import { InferType } from "yup";
import { deleteWalletSchema } from "../validations/delete_wallet_schema";

export type DeleteWalletRequest = InferType<typeof deleteWalletSchema>;
