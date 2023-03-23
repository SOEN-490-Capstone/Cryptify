import { InferType } from "yup";
import { forgotPasswordSchema } from "../validations/forgot_password_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ForgotPasswordRequest extends InferType<typeof forgotPasswordSchema> {}
