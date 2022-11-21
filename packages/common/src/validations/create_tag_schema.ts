import * as yup from "yup";

export const createTagSchema = yup.object({
    userId: yup.number().required(),
    tagName: yup.string().required(),
});
