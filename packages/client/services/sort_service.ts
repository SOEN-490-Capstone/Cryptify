import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

function sortDateNewest(transactions: Transaction[]) {
    return transactions.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
}

function sortDateOldest(transactions: Transaction[]) {
    return transactions.sort((a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf());
}

function sortAmountHighest(transactions: Transaction[], walletAddress: string) {
    // Filters the array of transactions based on if they're deposits or withdrawals
    // Performs the sort on the two shallow copy arrays and then concats the two arrays

    return transactions
        .filter((transaction) => transaction.walletIn === walletAddress)
        .sort((a, b) => Number(b.amount) - Number(a.amount))
        .concat(
            transactions
                .filter((transaction) => transaction.walletIn !== walletAddress)
                .sort((a, b) => Number(a.amount) - Number(b.amount)),
        );
}

function sortAmountLowest(transactions: Transaction[], walletAddress: string) {
    return transactions
        .filter((transaction) => transaction.walletIn !== walletAddress)
        .sort((a, b) => Number(b.amount) - Number(a.amount))
        .concat(
            transactions
                .filter((transaction) => transaction.walletIn === walletAddress)
                .sort((a, b) => Number(a.amount) - Number(b.amount)),
        );
}

// Applying the sort functions based on which sort option is selected
function sortTransactions(sortType: string, transactions: Transaction[], walletAddress: string): Transaction[] {
    switch (sortType) {
        case "sortDateNewest":
            return sortDateNewest([...transactions]);
        case "sortDateOldest":
            return sortDateOldest([...transactions]);
        case "sortAmountHighest":
            return sortAmountHighest([...transactions], walletAddress);
        case "sortAmountLowest":
            return sortAmountLowest([...transactions], walletAddress);
        default:
            return [];
    }
}

function sortBadgeValues(sortType: string) {
    let returnString = sortType;

    switch (sortType) {
        case "sortDateNewest":
            returnString = "Date: newest first";
            return returnString;

        case "sortDateOldest":
            returnString = "Date: oldest first";
            return returnString;

        case "sortAmountHighest":
            returnString = "Amount: highest first";
            return returnString;

        case "sortAmountLowest":
            returnString = "Amount: lowest first";
            return returnString;
        default:
            return returnString;
    }
}

export default {
    sortDateNewest,
    sortDateOldest,
    sortAmountHighest,
    sortAmountLowest,
    sortTransactions,
    sortBadgeValues,
};
