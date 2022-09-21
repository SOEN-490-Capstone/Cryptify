import * as yup from "yup";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";

export type SignUpRequest = yup.InferType<typeof signUpSchema>;
