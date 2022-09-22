import * as yup from "yup";

// Password requires at least 1 upper case, 1 lower case letter, 1 number, 1 special character, and
// has a minimum length of 8 characters
export const passwordSchema = yup
    .string()
    .matches(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()?+=_]).{6,20}$"),
        "Password must be between 6 and 20 characters",
    )
    .required("Enter a password.");
