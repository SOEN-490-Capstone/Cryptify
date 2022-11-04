import { InferType } from "yup";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";

export type SignUpRequest = InferType<typeof signUpSchema>;
