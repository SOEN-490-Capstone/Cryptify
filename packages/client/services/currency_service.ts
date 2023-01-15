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

export const currencyTypeToIcon: { [key in CurrencyType]: IconDefinition } = {
    [CurrencyType.ETHEREUM]: faEthereum,
    [CurrencyType.BITCOIN]: faBitcoin,
};
