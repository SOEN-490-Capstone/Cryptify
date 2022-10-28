import {WalletWithBalance} from "@cryptify/common/src/domain/wallet_with_balance";
import Web3 from "web3";
import {CurrencyType} from "@cryptify/common/src/domain/currency_type";

export function getWalletsTotal(wallets: WalletWithBalance[]): string {
    // After summing all the wallets together as a single BigNumber convert
    // the value to string, all trailing zeros are also dropped
    return wallets
        .map((wallet) => Web3.utils.toBN(wallet.balance))
        .reduce((total, balance) => total.add(balance), Web3.utils.toBN(0))
        .toString();
}
