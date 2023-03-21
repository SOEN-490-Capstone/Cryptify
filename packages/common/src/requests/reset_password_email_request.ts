import { InferType } from "yup";
import { resetPasswordEmailSchema } from "../validations/reset_password_email_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResetPasswordEmailRequest extends InferType<typeof resetPasswordEmailSchema> {}
