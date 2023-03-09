import * as yup from "yup";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { InferType } from "yup";

export const deleteFilterSchema = yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
    currencyType: yup.mixed<CurrencyType>().oneOf(Object.values(CurrencyType)).required(),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DeleteFilterRequest extends InferType<typeof deleteFilterSchema> {}
