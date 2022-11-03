import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import Web3 from "web3";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

export function getWalletsTotal(wallets: WalletWithBalance[]): string {
    // After summing all the wallets together as a single BigNumber convert
    // the value to string, all trailing zeros are also dropped
    return wallets
        .map((wallet) => Web3.utils.toBN(wallet.balance))
        .reduce((total, balance) => total.add(balance), Web3.utils.toBN(0))
        .toString();
}

export function getFormattedAmount(amount: string, type: CurrencyType): string {
    const amountInCurrency = type == CurrencyType.ETHEREUM ? Web3.utils.fromWei(amount, "ether") : amount;

    // This block takes care of formatting the currency with commas before the decimal
    const parts = amountInCurrency.split(".");
    if (parts[0].length >= 4) {
        parts[0] = parts[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    return parts.join(".");
}

export const currencyTagToName = new Map<string, CurrencyType>([
    ["ETH", CurrencyType.ETHEREUM],
    ["BTC", CurrencyType.BITCOIN],
]);
