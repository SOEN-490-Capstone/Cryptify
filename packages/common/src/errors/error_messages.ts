import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

export const ERROR_WALLET_DOES_NOT_EXIST = (currency: CurrencyType) =>
    `This ${currency} wallet address does not exist.`;
export const ERROR_EMAIL_OR_PASSWORD_INCORRECT = "Your email or password was incorrect.";
export const ERROR_EMAIL_IN_USE = "This email address is already associated with another account.";
export const ERROR_NOP = "nop";
export const ERROR_WALLET_ADDRESS_FOR_CURRENCY = (currency: string) =>
    `This wallet address is already associated with another ${currency} wallet.`;
export const ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT = "This wallet address is already associated with another wallet.";
