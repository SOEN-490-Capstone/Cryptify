import { InferType } from "yup";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";

export interface SignUpRequest extends InferType<typeof signUpSchema> {}
