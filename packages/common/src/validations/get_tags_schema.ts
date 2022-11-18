import * as yup from "yup";

export const getTagsSchema = yup.object({
    id: yup.number().required(),
});
