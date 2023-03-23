import * as yup from "yup";

export const forgotPasswordSchema = yup
    .object({
        email: yup
            .string()
            .email("This email is either not valid or not supported.")
            .max(50, "Email must be 50 characters or less.")
            .required("This email is either not valid or not supported."),
    })
    .required();
