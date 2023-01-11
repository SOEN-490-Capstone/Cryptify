import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

class TransactionFilter extends Filter {
    filter(walletAddress: string, transactions: Transaction[], filter: TransactionFilterEnum): Transaction[] {
        // filter for incoming transactions
        if (TransactionFilterEnum.CurrencyIn === filter) {
            transactions = transactions.filter((transaction) => transaction.walletIn === walletAddress);
        }

        // filter for outgoing transactions
        if (TransactionFilterEnum.CurrencyIn === filter) {
            transactions = transactions.filter((transaction) => transaction.walletOut === walletAddress);
        }

        return transactions;
    }
}
