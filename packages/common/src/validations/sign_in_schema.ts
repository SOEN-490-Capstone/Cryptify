import * as yup from "yup";
import { passwordSchema } from "@cryptify/common/src/validations/password_schema";

export const signInSchema = yup
    .object({
        email: yup.string().email("Enter a valid email.").required("Enter a valid email."),
        password: passwordSchema,
    })
    .required();
