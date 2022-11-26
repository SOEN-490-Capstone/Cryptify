import { InferType } from "yup";
import { createTagSchema } from "@cryptify/common/src/validations/create_tag_schema";

export interface CreateTagRequest extends InferType<typeof createTagSchema> {}
