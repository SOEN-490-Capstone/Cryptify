import * as yup from "yup";

export const deleteContactSchema = yup.object({
    id: yup.number().required(),
    name: yup.string().required(""),
});
