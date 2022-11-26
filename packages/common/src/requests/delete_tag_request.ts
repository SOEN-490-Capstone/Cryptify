import { InferType } from "yup";
import { deleteTagSchema } from "../validations/delete_tag_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DeleteTagRequest extends InferType<typeof deleteTagSchema> {}
