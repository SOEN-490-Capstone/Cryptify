import * as yup from "yup";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { InferType } from "yup";

export const createFilterSchema = yup.object({
    id: yup.number().required(),
    name: yup
        .string()
        .required()
        .min(0)
        .max(60, "Filter must be 60 characters or less.")
        .matches(
            /^[\w\-\s]+$/,
            "Filter name must only contain alphabetic characters, numbers, special characters, and spaces.",
        ),
    currencyType: yup.mixed<CurrencyType>().oneOf(Object.values(CurrencyType)).required(),
    txnIn: yup.boolean().required(),
    txnOut: yup.boolean().required(),
    start: yup.string().required(),
    end: yup.string().required(),
    tagNames: yup.array().of(yup.string()),
    contactNames: yup.array().of(yup.string()),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateFilterRequest extends InferType<typeof createFilterSchema> {}
