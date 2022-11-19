import { InferType } from "yup";
import { updateTagNameSchema } from "../validations/update_tag_name_schema";

export type UpdateTagNameRequest = InferType<typeof updateTagNameSchema>;
