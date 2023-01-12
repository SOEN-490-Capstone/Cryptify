import { InferType } from "yup";
import { getContactsSchema } from "../validations/get_contacts_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetContactsRequest extends InferType<typeof getContactsSchema> {}
