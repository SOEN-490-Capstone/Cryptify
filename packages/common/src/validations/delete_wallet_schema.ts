import * as yup from "yup";

export const deleteWalletSchema = yup.object({
    id: yup.number().required(),
    address: yup.string().required("Enter a wallet address."),
});
