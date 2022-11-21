import { InferType } from "yup";
import { createTagSchema } from "@cryptify/common/src/validations/create_tag_schema";

export type CreateTagRequest = InferType<typeof createTagSchema>;
