import { CurrencyType } from "@cryptify/common/src/enums/currency_type_enum";

export function getCurrencyType(walletAddress: string): CurrencyType {
    if (walletAddress.includes("0x")) return CurrencyType.ETHEREUM;

    return CurrencyType.BITCOIN;
}
