import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

export function getFiltersByTransactionStrings(currencyType: CurrencyType): string[] {
    return ["All transactions", `${currencyType} in`, `${currencyType} out`];
}

export function getFiltersByDateStrings(): string[] {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    return ["All transactions", "Past 90 days", currentYear.toString(), previousYear.toString(), "Custom Dates"];
}

export function filterTransction(
    currencyType: CurrencyType,
    walletAddress: string,
    transactions: Transaction[],
    filters: string[],
): Transaction[] {
    const filtersByTransaction = getFiltersByTransactionStrings(currencyType);
    const filtersByDate = getFiltersByDateStrings();
    const dateToday = new Date();

    filters.map((filter) => {
        // filter for incoming transactions
        if (filtersByTransaction[1] === filter) {
            transactions = transactions.filter((transaction) => transaction.walletIn === walletAddress);
        }

        // filter for outgoing transactions
        if (filtersByTransaction[2] === filter) {
            transactions = transactions.filter((transaction) => transaction.walletOut === walletAddress);
        }

        // filter for transactions that happened the passed 90 days
        if (filtersByDate[1] === filter) {
            transactions = transactions.filter(
                (transaction) =>
                    new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDay() - 90) <=
                    transaction.createdAt,
            );
        }

        // filter for transactions that happened this current year
        if (filtersByDate[2] === filter) {
            transactions = transactions.filter(
                (transaction) => new Date().getFullYear() === new Date(transaction.createdAt).getFullYear(),
            );
        }

        // filter for transactions that happened this previous year
        if (filtersByDate[3] === filter) {
            transactions = transactions.filter(
                (transaction) => new Date().getFullYear() - 1 === new Date(transaction.createdAt).getFullYear(),
            );
        }

        // filter for transactions that are between two given dates
        if (filter.split("-").length == 2) {
            const [fromDate, toDate] = filter.split("-");
            transactions = transactions.filter(
                (transaction) =>
                    new Date(fromDate) <= transaction.createdAt && new Date(toDate) >= transaction.createdAt,
            );
        }
    });

    return transactions;
}