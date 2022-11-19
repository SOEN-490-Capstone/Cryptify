import * as yup from "yup";

export const updateTagNameSchema = yup.object({
    userId: yup.number().required(),
    currentName: yup.string().required(),
    newName: yup.string().required(),
});
