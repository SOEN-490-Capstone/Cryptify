import * as yup from "yup";

export const updateContactSchema = yup.object({
    contactName: yup.string().required(),
    userId: yup.number().required(),
    newName: yup.string(),
    walletAddrs: yup.array().of(yup.string()),
});
