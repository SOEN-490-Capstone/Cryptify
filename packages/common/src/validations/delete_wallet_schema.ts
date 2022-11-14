import * as yup from "yup";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

export const deleteWalletSchema = yup.object({
    userId: yup.number().required(),
    address: yup.string().required("Enter a wallet address."),
    currencyType: yup.mixed<CurrencyType>().oneOf(Object.values(CurrencyType)).required(),
});
