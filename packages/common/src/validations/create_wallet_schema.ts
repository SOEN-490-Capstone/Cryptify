import * as yup from "yup";

export const createWalletSchema = yup
    .object({
        address: yup.string().required("Enter a valid wallet address."),
        name: yup.string().required("Enter a valid wallet name."),
    })
    .required();
