import * as yup from "yup";

export const getContactsSchema = yup.object({
    id: yup.number().required(),
});
