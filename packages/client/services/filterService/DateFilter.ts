import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

class DateFilter extends Filter {
    dateFrom: Date;
    dateTo: Date;

    constructor(dateFrom: Date, dateTo: Date) {
        super();
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    filter(transactions: Transaction[], filter: DateFilterEnum) {
        const dateToday = new Date();

        // filter for transactions that happened the passed 90 days
        if (DateFilterEnum.Past90Days === filter) {
            transactions = transactions.filter(
                (transaction) => new Date(+dateToday - 1000 * 60 * 60 * 24 * 90) <= new Date(transaction.createdAt),
            );
        }

        // filter for transactions that happened this current year
        if (DateFilterEnum.CurrentYear === filter) {
            transactions = transactions.filter(
                (transaction) => new Date().getFullYear() === new Date(transaction.createdAt).getFullYear(),
            );
        }

        // filter for transactions that happened this previous year
        if (DateFilterEnum.PastYear === filter) {
            transactions = transactions.filter(
                (transaction) => new Date().getFullYear() - 1 === new Date(transaction.createdAt).getFullYear(),
            );
        }

        // filter for transactions that are between two given dates
        if (DateFilterEnum.CustomDates === filter) {
            transactions = transactions.filter(
                (transaction) =>
                    this.dateFrom <= new Date(transaction.createdAt) && this.dateTo >= new Date(transaction.createdAt),
            );
        }
    }
}
