import { InferType } from "yup";
import { deleteContactSchema } from "../validations/delete_contact_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DeleteContactRequest extends InferType<typeof deleteContactSchema> {}
