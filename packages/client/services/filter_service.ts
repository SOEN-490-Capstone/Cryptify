import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { titleCase } from "@cryptify/common/src/utils/string_utils";

export function getFiltersByTransactionStrings(currencyType: CurrencyType): string[] {
    return ["All transactions", `${titleCase(currencyType)} in`, `${titleCase(currencyType)} out`];
}

export function getFiltersByDateStrings(): string[] {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    return ["All transactions", "Past 90 days", currentYear.toString(), previousYear.toString(), "Custom Dates"];
}

export function filterTransctions(
    currencyType: CurrencyType,
    walletAddress: string,
    transactions: Transaction[],
    filters: string[],
    contactFilters: string[],
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
                (transaction) => new Date(+dateToday - 1000 * 60 * 60 * 24 * 90) <= new Date(transaction.createdAt),
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
        if (
            filter.split("-").length == 2 &&
            new Date(filter.split("-")[0]).getDate() &&
            new Date(filter.split("-")[1]).getDate()
        ) {
            const [fromDate, toDate] = filter.split("-");
            transactions = transactions.filter(
                (transaction) =>
                    new Date(fromDate) <= new Date(transaction.createdAt) &&
                    new Date(toDate) >= new Date(transaction.createdAt),
            );
        }
    });

    if (contactFilters.length !== 0) {
        transactions = transactions.filter(
            (transaction) =>
                contactFilters.includes(transaction.contactIn?.contactName ?? "") ||
                contactFilters.includes(transaction.contactOut?.contactName ?? ""),
        );
    }
    return transactions;
}
