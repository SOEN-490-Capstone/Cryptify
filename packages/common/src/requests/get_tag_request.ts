import { InferType } from "yup";
import { getTagSchema } from "../validations/get_tag_schema";

export type GetTagRequest = InferType<typeof getTagSchema>;
