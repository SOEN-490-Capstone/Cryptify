export const ERROR_EMAIL_OR_PASSWORD_INCORRECT = "Your email or password was incorrect.";
export const ERROR_EMAIL_IN_USE = "This email address is already associated with another account.";

export const ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY = (currency: string) =>
    `address:Enter a valid ${currency} wallet address.`;
export const ERROR_WALLET_ALREADY_ADDED_TO_ACCOUNT = (currency: string) =>
    `address:This wallet address is already associated with another ${currency} wallet.`;
export const ERROR_WALLET_NAME_ALREADY_ADDED_TO_ACCOUNT = "name:This name is already associated with another wallet.";

export const ERROR_NOP = "nop";

export const ERROR_TAG_NAME_ALREADY_ADDED_TO_ACCOUNT = "This tag has already been added.";
export const ERROR_TAG_NAME_ALREADY_EXIST = "This tag already exists.";
export const ERROR_TAG_NOT_FOUND = "Transaction tag not found.";
export const ERROR_TRANSACTIONS_NOT_FOUND = "One or more transactions not found.";

export const ERROR_CONTACT_NAME_ALREADY_ADDED_TO_ACCOUNT = "This name is already associated with another contact.";
