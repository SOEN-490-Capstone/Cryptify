import { InferType } from "yup";
import { createContactSchema } from "@cryptify/common/src/validations/create_contact_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateContactRequest extends InferType<typeof createContactSchema> {}
