import * as yup from "yup";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

export const updateWalletSchema = yup.object({
    name: yup
        .string()
        .min(0)
        .max(32, "Name must be 32 characters or less.")
        .matches(/^[\w\-\s]+$/, "Name must only contain alphanumeric characters and spaces.")
        .required("Enter a name."),
});
