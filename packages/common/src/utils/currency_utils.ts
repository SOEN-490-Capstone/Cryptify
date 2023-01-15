import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import Web3 from "web3";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

type ISOCode = "ETH" | "BTC";
export const typeToISOCode: { [key in CurrencyType]: ISOCode } = {
    [CurrencyType.ETHEREUM]: "ETH",
    [CurrencyType.BITCOIN]: "BTC",
};

export function getFormattedAmount(amount: string, type: CurrencyType): string {
    const amountInCurrency = type == CurrencyType.ETHEREUM ? Web3.utils.fromWei(amount, "ether") : amount;

    // This block takes care of formatting the currency with commas before the decimal
    const parts = amountInCurrency.split(".");
    if (parts[0].length >= 4) {
        parts[0] = parts[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    return parts.join(".");
}
