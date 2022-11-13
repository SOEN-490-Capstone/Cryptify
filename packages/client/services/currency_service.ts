import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import Web3 from "web3";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { faEthereum } from "../components/icons/brands/faEthereum";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBitcoin } from "../components/icons/brands/faBitcoin";

export function getWalletsTotal(wallets: WalletWithBalance[], type: CurrencyType): string {
    // After summing all the wallets together as a single BigNumber convert
    // the value to string, all trailing zeros are also dropped
    if (type == CurrencyType.ETHEREUM) {
        return wallets
            .filter((wallet) => wallet.currencyType == CurrencyType.ETHEREUM)
            .map((wallet) => Web3.utils.toBN(wallet.balance))
            .reduce((total, balance) => total.add(balance), Web3.utils.toBN(0))
            .toString();
    }
    if (type == CurrencyType.BITCOIN) {
        return wallets
            .filter((wallet) => wallet.currencyType == CurrencyType.BITCOIN)
            .map((wallet) => parseFloat(wallet.balance))
            .reduce((total, balance) => total + balance, 0)
            .toString();
    }

    return "";
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

type ISOCode = "ETH" | "BTC";

export const typeToISOCode: { [key in CurrencyType]: ISOCode } = {
    [CurrencyType.ETHEREUM]: "ETH",
    [CurrencyType.BITCOIN]: "BTC",
};

export const currencyTypeToIcon: { [key in CurrencyType]: IconDefinition } = {
    [CurrencyType.ETHEREUM]: faEthereum,
    [CurrencyType.BITCOIN]: faBitcoin,
};

