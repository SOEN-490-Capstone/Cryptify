import * as yup from "yup";

export const forgotPasswordSchema = yup
    .object({
        email: yup
            .string()
            .email("This email is either not valid or not supported.")
            .required("This email is either not valid or not supported."),
    })
    .required();
