import * as yup from "yup";

export const postTagSchema = yup.object({
    id: yup.number().required(),
    tagName: yup.string().required(),
});
