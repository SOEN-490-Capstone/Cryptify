import { InferType } from "yup";
import { updateWalletSchema } from "@cryptify/common/src/validations/update_wallet_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateWalletRequest extends InferType<typeof updateWalletSchema> {}
