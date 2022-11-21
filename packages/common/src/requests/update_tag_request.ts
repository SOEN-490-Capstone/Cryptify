import { InferType } from "yup";
import { updateTagSchema } from "../validations/update_tag_schema";

export type UpdateTagRequest = InferType<typeof updateTagSchema>;
