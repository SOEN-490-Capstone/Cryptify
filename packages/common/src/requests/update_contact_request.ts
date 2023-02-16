import { InferType } from "yup";
import { updateContactSchema } from "@cryptify/common/src/validations/update_contact_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateContactRequest extends InferType<typeof updateContactSchema> {}
