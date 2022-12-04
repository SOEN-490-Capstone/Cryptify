import * as yup from "yup";

export const createTagSchema = yup.object({
    userId: yup.number().required(),
    tagName: yup.string().required(),
    transactionIds: yup.array().of(yup.number()),
});
