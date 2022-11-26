import { InferType } from "yup";
import { deleteTagSchema } from "../validations/delete_tag_schema";

export interface DeleteTagRequest extends InferType<typeof deleteTagSchema> {}
