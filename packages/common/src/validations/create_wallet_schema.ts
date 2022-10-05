import * as yup from "yup";
import { CurrencyType } from "@cryptify/common/src/enums/currency_type_enum";

export const createWalletSchema = yup.object({
    userId: yup.number().required(),
    address: yup.string().required("Enter a valid wallet address."),
    name: yup.string().required("Enter a valid wallet name."),
    currencyType: yup.string().oneOf(Object.values(CurrencyType)).required(),
});
