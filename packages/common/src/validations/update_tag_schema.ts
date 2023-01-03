import * as yup from "yup";

export const updateTagSchema = yup.object({
    userId: yup.number().required(),
    currentName: yup.string().required(),
    newName: yup.string(),
    addTransactions: yup.array().of(yup.number()),
    removeTransactions: yup.array().of(yup.number()),
});
