import * as yup from "yup";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

export const createWalletSchema = yup.object({
    userId: yup.number().required(),
    address: yup.string().required("Enter a wallet address."),
    name: yup
        .string()
        .min(0)
        .max(32, "Name must be 32 characters or less.")
        .matches(/^[\w\-\s]+$/, "Name must only contain alphanumeric characters and spaces")
        .required("Enter a name."),
    currencyType: yup.mixed<CurrencyType>().oneOf(Object.values(CurrencyType)).required(),
});
