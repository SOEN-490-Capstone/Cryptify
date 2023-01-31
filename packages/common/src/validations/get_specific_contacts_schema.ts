import * as yup from "yup";

export const getSpecificContactsSchema = yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
});
