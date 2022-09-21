import * as yup from "yup";
import { signInSchema } from "@cryptify/common/src/validations/sign_in_schema";

export type SignInRequest = yup.InferType<typeof signInSchema>;
