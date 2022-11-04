import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import Web3 from "web3";

export function getTransactionByWallet(transactions: Transaction[], walletAddress: string): Transaction[] {
   return transactions.filter((transaction) => transaction.walletIn == walletAddress || transaction.walletOut == walletAddress);
}

export function getTransactionCount(transactions: Transaction[]): number {
    return transactions.length;
}

// Todo refactor when Bitcoin is added
export function getTransactionTotalReceived(transactions: Transaction[]): string {
    const totalInWei = transactions
        .map((transaction) => Web3.utils.toBN(transaction.amount))
        .reduce((total, balance) => total.add(balance), Web3.utils.toBN(0))
        .toString();

    return Web3.utils.fromWei(totalInWei, "ether");
}

// Todo refactor when Bitcoin is added
export function getTransactionTotalSent(transactions: Transaction[]): string {
    const totalInWei = transactions
        .map((transaction) => Web3.utils.toBN(transaction.amount))
        .reduce((total, balance) => total.add(balance), Web3.utils.toBN(0))
        .toString();

    return Web3.utils.fromWei(totalInWei, "ether");
}
