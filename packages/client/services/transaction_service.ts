import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import Web3 from "web3";

export function getTransactionByWallet(transactions: Transaction[], walletAddress: string): Transaction[] {
    return transactions.filter(
        (transaction) =>
            transaction.walletIn.toLowerCase() === walletAddress.toLowerCase() ||
            transaction.walletOut.toLowerCase() === walletAddress.toLowerCase(),
    );
}

export function getTransactionCount(transactions: Transaction[]): number {
    return transactions.length;
}

// Todo refactor when Bitcoin is added
export function getTransactionTotalReceived(address: string, transactions: Transaction[], type: CurrencyType): string {
    if (type == CurrencyType.ETHEREUM) {
        const totalInWei = transactions
            .filter((transaction) => transaction.walletIn == address)
            .map((transaction) => Web3.utils.toBN(transaction.amount))
            .reduce((total, balance) => total.add(balance), Web3.utils.toBN(0))
            .toString();

        return Web3.utils.fromWei(totalInWei, "ether");
    }

    if (type == CurrencyType.BITCOIN) {
        const totalInBtc = transactions
            .filter((transaction) => transaction.walletIn == address)
            .map((transaction) => parseFloat(transaction.amount))
            .reduce((total, balance) => total + balance, 0)
            .toString();

        return totalInBtc;
    }

    return "";
}

// Todo refactor when Bitcoin is added
export function getTransactionTotalSent(address: string, transactions: Transaction[], type: CurrencyType): string {
    if (type == CurrencyType.ETHEREUM) {
        const totalInWei = transactions
            .filter((transaction) => transaction.walletOut == address)
            .map((transaction) => Web3.utils.toBN(transaction.amount))
            .reduce((total, balance) => total.add(balance), Web3.utils.toBN(0))
            .toString();

        return Web3.utils.fromWei(totalInWei, "ether");
    }
    if (type == CurrencyType.BITCOIN) {
        const totalInBtc = transactions
            .filter((transaction) => transaction.walletOut == address)
            .map((transaction) => parseFloat(transaction.amount))
            .reduce((total, balance) => total + balance, 0)
            .toString();

        return totalInBtc;
    }

    return "";
}
