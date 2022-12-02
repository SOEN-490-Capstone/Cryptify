import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
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
