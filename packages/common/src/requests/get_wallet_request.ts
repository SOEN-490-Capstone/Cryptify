import {InferType} from "yup";
import { getWalletsSchema } from "@cryptify/common/src/validations/get_wallets_schema";

export interface GetWalletsRequest extends InferType<typeof getWalletsSchema> {}
