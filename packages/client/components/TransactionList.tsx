import React from "react";
import { Text, Box } from "native-base";
import { StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionListItem } from "./TransactionListItem";

type Props = {
    transactions: Transaction[];
    walletAddress: string;
    displaySeparation: boolean;
};

export function TransactionList({ transactions, walletAddress, displaySeparation }: Props) {
    let savedDate = new Date();
    function renderSeparation(date: Date) {
        if (savedDate?.getFullYear() == date.getFullYear() && savedDate.getMonth() == date.getMonth()) {
            savedDate = date;
            return;
        }
        savedDate = date;
        return (
            <Box backgroundColor="text.100">
                <Text color="text.500" style={styles.dateSeparator}>
                    {date.toLocaleString("en-US", { month: "long" }) + " " + date.getFullYear()}
                </Text>
            </Box>
        );
    }

    function renderTransactions(transactions: Transaction[]) {
        return (
            <Box backgroundColor="white" style={styles.transactionWrapper}>
                {transactions.map((transaction) => (
                    <TransactionListItem transaction={transaction} walletAddress={walletAddress} />
                ))}
            </Box>
        );
    }

    if (displaySeparation) {
        return (
            <>
                {transactions.map((transaction) => (
                    <>
                        {renderSeparation(transaction.createdAt)}
                        <Box backgroundColor="white" style={styles.transactionWrapper}>
                            <TransactionListItem transaction={transaction} walletAddress={walletAddress} />
                        </Box>
                    </>
                ))}
            </>
        );
    }
    return <>{renderTransactions(transactions)}</>;
}

const styles = StyleSheet.create({
    dateSeparator: {
        fontSize: 17,
        fontWeight: "600",
        marginLeft: 15,
    },
    transactionWrapper: {
        paddingLeft: 15,
        paddingRight: 15,
    },
});
