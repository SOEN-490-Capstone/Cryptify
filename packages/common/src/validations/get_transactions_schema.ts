import * as yup from "yup";

export const getTransactionsSchema = yup.object({
    id: yup.number().required(),
});
