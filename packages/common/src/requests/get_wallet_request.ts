import * as yup from "yup";
import { getWalletsSchema } from "@cryptify/common/src/validations/get_wallets_schema";

export type GetWalletsRequest = yup.InferType<typeof getWalletsSchema>;
