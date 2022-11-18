import { InferType } from "yup";
import { getTagsSchema } from "../validations/get_tags_schema";

export type GetTagsRequest = InferType<typeof getTagsSchema>;
