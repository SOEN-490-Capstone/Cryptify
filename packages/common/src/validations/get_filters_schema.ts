import * as yup from "yup";
import {CurrencyType} from "@cryptify/common/src/domain/currency_type";
import {InferType} from "yup";
import {createTagSchema} from "@cryptify/common/src/validations/create_tag_schema";

export const getFiltersSchema = yup.object({
    userId: yup.number().required(),
    currencyType: yup.mixed<CurrencyType>().oneOf(Object.values(CurrencyType)).required(),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetFiltersRequest extends InferType<typeof getFiltersSchema> {}