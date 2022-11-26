import { InferType } from "yup";
import { getTagsSchema } from "../validations/get_tags_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetTagsRequest extends InferType<typeof getTagsSchema> {}
