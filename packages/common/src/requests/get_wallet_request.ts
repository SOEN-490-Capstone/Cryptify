import { InferType } from "yup";
import { getWalletsSchema } from "@cryptify/common/src/validations/get_wallets_schema";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetWalletsRequest extends InferType<typeof getWalletsSchema> {}
