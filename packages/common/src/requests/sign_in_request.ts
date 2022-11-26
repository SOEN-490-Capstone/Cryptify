import { InferType } from "yup";
import { signInSchema } from "@cryptify/common/src/validations/sign_in_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SignInRequest extends InferType<typeof signInSchema> {}
