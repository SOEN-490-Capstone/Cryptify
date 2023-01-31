import { InferType } from "yup";
import { getSpecificContactsSchema } from "../validations/get_specific_contacts_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetSpecificContactsRequest extends InferType<typeof getSpecificContactsSchema> {}
