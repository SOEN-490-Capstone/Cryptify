import { InferType } from "yup";
import { updateTagSchema } from "../validations/update_tag_schema";

export interface UpdateTagRequest extends InferType<typeof updateTagSchema> {}
