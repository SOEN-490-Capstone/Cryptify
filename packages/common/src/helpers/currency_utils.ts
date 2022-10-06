import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

export function getCurrencyType(walletAddress: string): CurrencyType {
    if (walletAddress.includes("0x")) return CurrencyType.ETHEREUM;

    return CurrencyType.BITCOIN;
}
