import { InferType } from "yup";
import { updateTagSchema } from "../validations/update_tag_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateTagRequest extends InferType<typeof updateTagSchema> {}
