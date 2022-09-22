import * as yup from "yup";
import { passwordSchema } from "@cryptify/common/src/validations/password_schema";

export const signUpSchema = yup
    .object({
        firstName: yup.string().matches(new RegExp("^[A-Za-z]+"), "First name must only contain alphabetic characters.").min(0).max(32, "First name must be 32 characters or less.").required("Enter a first name."),
        lastName: yup.string().matches(new RegExp("^[A-Za-z]+"), "Last name must only contain alphabetic characters.").min(0).max(32, "Last name must be 32 characters or less.").required("Enter a last name."),
        email: yup.string().email("Email must be 50 characters or less.").required("Enter a valid email."),
        password: passwordSchema,
        confirmPassword: yup
            .string()
            .equals([yup.ref("password"), null], "The passwords you entered do not match.")
            .required("Confirm your password."),
    })
    .required();
