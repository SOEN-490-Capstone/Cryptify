import { InferType } from "yup";
import { createTagSchema } from "@cryptify/common/src/validations/create_tag_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateTagRequest extends InferType<typeof createTagSchema> {}
