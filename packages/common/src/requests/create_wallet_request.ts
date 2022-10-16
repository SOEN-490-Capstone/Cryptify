import { InferType } from "yup";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";

export type CreateWalletRequest = InferType<typeof createWalletSchema>;
