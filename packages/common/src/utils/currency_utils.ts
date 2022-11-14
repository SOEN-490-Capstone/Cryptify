import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
// @ts-ignore
import { validate } from "./wav";

const btcTxRegex = /^[a-fA-F0-9]{64}$/;
const ethTxRegex = /^0x([A-Fa-f0-9]{64})$/;

export function getCurrencyType(address: string): CurrencyType {
    if (validate(address, "BTC") || btcTxRegex.test(address)) {
        return CurrencyType.BITCOIN;
    }
    if (validate(address, "ETH") || ethTxRegex.test(address)) {
        return CurrencyType.ETHEREUM;
    }

    throw new Error("Currency type not supported");
}

export function normalizeCurrency(amount: number): string {
    const amountString = amount.toString();

    const isScientificNotation = amountString.includes("e");
    if (isScientificNotation) {
        return amount.toFixed(18);
    }

    return amountString;
}
