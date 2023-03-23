import * as yup from "yup";
import { passwordSchema } from "@cryptify/common/src/validations/password_schema";

export const resetPasswordSchema = yup
    .object({
        token: yup.string().required(),
        password: passwordSchema,
    })
    .required();
