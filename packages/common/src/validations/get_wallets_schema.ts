import * as yup from "yup";

export const getWalletsSchema = yup.object({
    id: yup.number().required(),
});
