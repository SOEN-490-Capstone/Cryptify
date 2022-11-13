import { InferType } from "yup";
import { postTagSchema } from "../validations/post_tag_schema";

export type PostTagRequest = InferType<typeof postTagSchema>;
