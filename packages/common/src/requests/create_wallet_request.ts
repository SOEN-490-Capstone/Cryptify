import { InferType} from "yup";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";

export interface CreateWalletRequest extends InferType<typeof createWalletSchema> {}
