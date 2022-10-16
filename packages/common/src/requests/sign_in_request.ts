import {InferType} from "yup";
import { signInSchema } from "@cryptify/common/src/validations/sign_in_schema";

export interface SignInRequest extends InferType<typeof signInSchema> {}
