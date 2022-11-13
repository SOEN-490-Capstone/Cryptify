import {CurrencyType} from "@cryptify/common/src/domain/currency_type";
import {validate} from "wallet-address-validator";

export function getCurrencyType(address: string): CurrencyType {
    if (validate(address, 'BTC')) {
        return CurrencyType.BITCOIN
    }
    if (validate(address, 'ETH')) {
        return CurrencyType.ETHEREUM
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
