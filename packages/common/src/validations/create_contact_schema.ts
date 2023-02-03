import * as yup from "yup";

export const createContactSchema = yup.object({
    contactName: yup.string().required(),
    userId: yup.number().required(),
    ethWallets: yup.array().of(yup.string()).required(),
    btcWallets: yup.array().of(yup.string()).required(),
    ethWalletsDelete: yup.array().of(yup.string()).required(),
    btcWalletsDelete: yup.array().of(yup.string()).required(),
});
