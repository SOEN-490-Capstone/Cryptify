import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

export function getCurrencyType(address: string): CurrencyType {
    // TODO these regex are not good at all and should be refactored
    // to either a formal implementation in the system or using
    // a well known package
    if (address.includes("0x")) return CurrencyType.ETHEREUM;
    if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(address)) return CurrencyType.BITCOIN;

    return CurrencyType.UNKNOWN;
}
