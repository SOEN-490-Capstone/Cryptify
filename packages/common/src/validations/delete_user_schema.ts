import * as yup from "yup";

export const deleteUserSchema = yup.object({
    id: yup.number().required(),
});
