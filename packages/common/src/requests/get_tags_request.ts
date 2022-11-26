import { InferType } from "yup";
import { getTagsSchema } from "../validations/get_tags_schema";

export interface GetTagsRequest extends InferType<typeof getTagsSchema> {}
