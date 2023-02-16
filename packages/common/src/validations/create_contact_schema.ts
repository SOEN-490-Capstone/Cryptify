import * as yup from "yup";

export const createContactSchema = yup.object({
    contactName: yup.string().required(),
    userId: yup.number().required(),
    walletAddrs: yup.array().of(yup.string()).required(),
});
