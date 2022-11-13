import * as yup from "yup";

export const getTagSchema = yup.object({
    id: yup.number().required(),
});
