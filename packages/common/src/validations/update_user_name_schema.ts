import * as yup from "yup";

export const updateUserNameSchema = yup
    .object({
        firstName: yup
            .string()
            .matches(new RegExp("^[A-Za-z]+"), "First name must only contain alphabetic characters.")
            .min(0)
            .max(32, "First name must be 32 characters or less.")
            .required("Enter a first name."),
        lastName: yup
            .string()
            .matches(new RegExp("^[A-Za-z]+"), "Last name must only contain alphabetic characters.")
            .min(0)
            .max(32, "Last name must be 32 characters or less.")
            .required("Enter a last name."),
    })
    .required();
