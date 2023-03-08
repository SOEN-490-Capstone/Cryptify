import * as yup from "yup";
import {CurrencyType} from "@cryptify/common/src/domain/currency_type";
import {InferType} from "yup";
import {createTagSchema} from "@cryptify/common/src/validations/create_tag_schema";

export const createFilterSchema = yup.object({
    userId: yup.number().required(),
    name: yup.string().required(),
    currencyType: yup.mixed<CurrencyType>().oneOf(Object.values(CurrencyType)).required(),
    txnIn: yup.boolean().required(),
    txnOut: yup.boolean().required(),
    start: yup.number().required(),
    end: yup.number().required(),
    tagNames: yup.array().of(yup.string()),
    contactNames: yup.array().of(yup.string()),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateFilterRequest extends InferType<typeof createFilterSchema> {}