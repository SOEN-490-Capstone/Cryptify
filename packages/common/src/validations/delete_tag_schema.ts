import * as yup from "yup";

export const deleteTagSchema = yup.object({
    id: yup.number().required(),
    name: yup.string().required(""),
});
