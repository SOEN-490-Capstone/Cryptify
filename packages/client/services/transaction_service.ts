import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import Web3 from "web3";

export function getTransactionCount(transactions: Transaction[], address: string): number {
    return transactions.filter((transaction) => transaction.walletIn === address || transaction.walletOut === address)
        .length;
}

// Todo refactor when Bitcoin is added
export function getTransactionTotalReceived(transactions: Transaction[], address: string): string {
    const totalInWei = transactions
        .filter((transaction) => transaction.walletOut == address)
        .map((transaction) => Web3.utils.toBN(transaction.amount))
        .reduce((total, balance) => total.add(balance), Web3.utils.toBN(0))
        .toString();

    return Web3.utils.fromWei(totalInWei, "ether");
}

// Todo refactor when Bitcoin is added
export function getTransactionTotalSent(transactions: Transaction[], address: string): string {
    const totalInWei = transactions
        .filter((transaction) => transaction.walletIn == address)
        .map((transaction) => Web3.utils.toBN(transaction.amount))
        .reduce((total, balance) => total.add(balance), Web3.utils.toBN(0))
        .toString();

    return Web3.utils.fromWei(totalInWei, "ether");
}

export function weiToEth(weiValue: string): string {
    return Web3.utils.fromWei(weiValue);
}
