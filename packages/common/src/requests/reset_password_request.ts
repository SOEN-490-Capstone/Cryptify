import { InferType } from "yup";
import { resetPasswordSchema } from "@cryptify/common/src/validations/reset_password_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResetPasswordRequest extends InferType<typeof resetPasswordSchema> {}
