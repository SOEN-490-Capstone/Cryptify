import * as yup from "yup";
import { passwordSchema } from "@cryptify/common/src/validations/password_schema";

export const signUpSchema = yup
    .object({
        firstName: yup.string().matches(new RegExp("^[A-Za-z]+")).min(0).max(32).required("Enter a valid first name"),
        lastName: yup.string().matches(new RegExp("^[A-Za-z]+")).min(0).max(32).required("Enter a valid last name"),
        email: yup.string().email().required("Enter a valid email"),
        password: passwordSchema,
        confirmPassword: yup
            .string()
            .equals([yup.ref("password"), null], "Password does not match")
            .required("Password does not match"),
    })
    .required();
