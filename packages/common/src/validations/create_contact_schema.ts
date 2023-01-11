import * as yup from "yup";

export const createContactSchema = yup.object({
    name: yup.string().required(),
    userId: yup.number().required(),
    ethWallets: yup.array().of(yup.string()),
    btcWallets: yup.array().of(yup.string()),
});
