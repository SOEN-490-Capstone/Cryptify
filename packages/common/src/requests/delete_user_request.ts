import { InferType } from "yup";
import { deleteUserSchema } from "@cryptify/common/src/validations/delete_user_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DeleteUserRequest extends InferType<typeof deleteUserSchema> {}
