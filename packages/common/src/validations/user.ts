import Joi from "joi";

// Password requires at least 1 upper case, 1 lower case letter, 1 number, 1 special character, and
// has a minimum length of 8 characters
const passwordSchema = Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()?+=_]).{8,20}$"))
    .required();

export const signUpSchema = Joi.object({
    firstName: Joi.string().pattern(new RegExp("^[A-Za-z]+")).min(1).max(32).required(),
    lastName: Joi.string().pattern(new RegExp("^[A-Za-z]+")).min(1).max(32).required(),
    email: Joi.string().email().required(),
    password: passwordSchema,
}).required();
