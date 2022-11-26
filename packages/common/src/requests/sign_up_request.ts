import { InferType } from "yup";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SignUpRequest extends InferType<typeof signUpSchema> {}
