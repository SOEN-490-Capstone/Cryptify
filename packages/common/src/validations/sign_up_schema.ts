import yup from "yup";
import { passwordSchema } from "@cryptify/common/src/validations/password_schema";

export const signUpSchema = yup
    .object({
        firstName: yup.string().matches(new RegExp("^[A-Za-z]+")).min(0).max(32).required(),
        lastName: yup.string().matches(new RegExp("^[A-Za-z]+")).min(0).max(32).required(),
        email: yup.string().email().required(),
        password: passwordSchema,
    })
    .required();
