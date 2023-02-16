import { InferType } from "yup";
import { updateContactSchema } from "@cryptify/common/src/validations/update_contact_schema";
import {Role} from "@cryptify/common/src/domain/role";
import * as yup from "yup";

export interface UpdateContactRequest {
    userId: number;
    contactName: string;
    newName?: string;
    walletAddrs?: string[];
}
