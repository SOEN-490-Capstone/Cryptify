import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
//import { validate } from "wallet-address-validator";

const btcTxRegex = /^[a-fA-F0-9]{40,64}$/;
const ethTxRegex = /^0x[a-fA-F0-9]{40,64}$/;

export function getCurrencyType(address: string): CurrencyType {
    if (btcTxRegex.test(address)) {
        return CurrencyType.BITCOIN;
    }
    if (ethTxRegex.test(address)) {
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
