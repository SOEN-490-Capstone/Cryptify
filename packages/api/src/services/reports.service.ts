import { Injectable } from "@nestjs/common";
import { CreateTransactionHistoryReportRequest } from "@cryptify/common/src/requests/create_transaction_history_report_request";
import { EdgeGatewayStrategyFactory } from "@cryptify/api/src/gateways/edge-gateway/edge_gateway_strategy_factory";
import { typeToISOCode } from "@cryptify/common/src/utils/currency_utils";
import { ContactsService } from "@cryptify/api/src/services/contacts.service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import fs from "fs";

@Injectable()
export class ReportsService {
    constructor(
        private readonly edgeGatewayStrategyFactory: EdgeGatewayStrategyFactory,
        private readonly contactsService: ContactsService,
    ) {}

    async generateTransactionHistory(req: CreateTransactionHistoryReportRequest): Promise<void> {
        const edgeGatewayStrategy = this.edgeGatewayStrategyFactory.get(req.currencyType);
        const [transactions, wallets] = await Promise.all([
            edgeGatewayStrategy.getTransactions({ id: req.userId }),
            edgeGatewayStrategy.getWallets({ id: req.userId }),
        ]);

        // Filter transactions
        // 1. Includes the wallet address of the report
        // 2. Filter for only transaction in, out, or both, depending on req params
        // NOTE: selecting "All transactions" will cause both 2. and 3. to be true
        // 3. Transaction was created after the start date
        // 4. Transaction was created after the end date
        // NOTE: selecting "All transactions" will have a start date of 0 and an end date of the current date + 1
        // TODO: This is a fix since the timestamp is stored as a string literal and does not get casted as a date
        // object, ideally the timestamp is stored as an integer unix timestamp
        const filters: ((txn: Transaction) => boolean)[] = [
            (txn) => txn.walletIn === req.walletAddress || txn.walletOut === req.walletAddress,
            (txn) =>
                (req.transactionsIn && txn.walletIn === req.walletAddress) ||
                (req.transactionsOut && txn.walletOut === req.walletAddress),
            (txn) => +new Date(txn.createdAt) >= +req.startDate,
            (txn) => +new Date(txn.createdAt) <= +req.endDate,
        ];
        // Apply each filter above to the transactions and only include the transactions that pass all filters
        const walletTxns = transactions.filter((txn) =>
            filters.map((filter) => filter(txn)).every((result) => result === true),
        );

        // TODO: Get users contacts and create map of addr -> "contact (addr)", include users wallet addr as wallet name
        // only

        const wallet = wallets.find((wallet) => wallet.address === req.walletAddress);
        const fileName = `${wallet.name} Transaction History.csv`;
        const writeStream = fs.createWriteStream(`./${fileName}`);

        // Write headers to csv
        const TRANSACTION_HISTORY_HEADERS = [
            "Transaction ID",
            "Status",
            "From",
            "To",
            "Transaction Type",
            "Transaction Date",
            "Transaction Time",
            `Transaction Amount ${typeToISOCode[req.currencyType]}`,
            `Transaction Fee ${typeToISOCode[req.currencyType]}`,
        ] as const;
        writeStream.write(TRANSACTION_HISTORY_HEADERS.join(",") + "\n");

        walletTxns
            .map(
                (txn) =>
                    ({
                        transactionId: txn.transactionAddress,
                        status: "CONFIRMED",
                        from: txn.walletOut,
                        to: txn.walletIn,
                        transactionType: `${req.currencyType} ${req.walletAddress === txn.walletIn ? "IN" : "OUT"}`,
                        transactionDate: new Date(txn.createdAt).toLocaleDateString(["en-us"], {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                        }),
                        transactionTime: new Date(txn.createdAt).toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                        }),
                        transactionAmount: `${req.walletAddress === txn.walletIn ? "+" : "-"}${txn.amount}`,
                        transactionFee: "0",
                    } as TransactionHistoryReportRow),
            )
            .forEach((row) => {
                const serializedRow = Object.values(row).join(",") + "\n";
                writeStream.write(serializedRow);
            });

        writeStream.end();
    }
}

interface TransactionHistoryReportRow {
    transactionId: string;
    status: string;
    from: string;
    to: string;
    transactionType: string;
    transactionDate: string;
    transactionTime: string;
    transactionAmount: string;
    transactionFee: string;
}
