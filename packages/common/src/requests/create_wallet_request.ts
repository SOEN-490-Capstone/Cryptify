import { InferType } from "yup";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateWalletRequest extends InferType<typeof createWalletSchema> {}
