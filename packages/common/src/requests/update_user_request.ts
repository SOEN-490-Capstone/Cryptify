import {InferType} from "yup";
import {updateUserSchema} from "@cryptify/common/src/validations/update_user_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateUserRequest extends InferType<typeof updateUserSchema> {}
