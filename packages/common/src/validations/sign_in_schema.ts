import yup from "yup";
import {passwordSchema} from "@cryptify/common/src/validations/password_schema";

export const signInSchema = yup.object({
    email: yup.string().email().required(),
    password: passwordSchema,
}).required();
