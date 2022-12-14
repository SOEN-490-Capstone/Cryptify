import * as yup from "yup";

export const updateUserSchema = yup.object({
    userId: yup.number().required(),
    firstName: yup
        .string()
        .matches(new RegExp("^[A-Za-z]+"), "First name must only contain alphabetic characters.")
        .min(0)
        .max(32, "First name must be 32 characters or less."),
    lastName: yup
        .string()
        .matches(new RegExp("^[A-Za-z]+"), "Last name must only contain alphabetic characters.")
        .min(0)
        .max(32, "Last name must be 32 characters or less."),
    email: yup.string().email("Enter a valid email.").max(50, "Email must be 50 characters or less."),
    password: yup
        .string()
        .min(6, "Password must be between 6 and 20 characters.")
        .max(20, "Password must be between 6 and 20 characters.")
        .matches(
            new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()?+=_]).{6,20}$"),
            "Password must contain at least 1 upper case, 1 lower case letter, 1 number, and 1 special character.",
        ),
    areNotificationsEnabled: yup.boolean(),
});
