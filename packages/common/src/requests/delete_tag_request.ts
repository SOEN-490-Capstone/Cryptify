import { InferType } from "yup";
import { deleteTagSchema } from "../validations/delete_tag_schema";

export type DeleteTagRequest = InferType<typeof deleteTagSchema>;
