import React from "react";
import { Text, Box } from "native-base";
import { StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionListItem } from "./TransactionListItem";
import { CompositeNavigationProp } from "@react-navigation/native";

type Props = {
    transactions: Transaction[];
    walletAddress: string;
    displaySeparation: boolean;
    navigation: CompositeNavigationProp<any, any>;
};

export function TransactionList({ transactions, walletAddress, displaySeparation, navigation }: Props) {
    let savedDate = new Date();
    function renderHeader(date: Date, i: number) {
        if (savedDate?.getFullYear() == date.getFullYear() && savedDate.getMonth() == date.getMonth()) {
            savedDate = date;
            return;
        }
        savedDate = date;
        return (
            <Box key={i} backgroundColor="text.100">
                <Text color="text.500" style={styles.dateSeparator}>
                    {date.toLocaleString("en-US", { month: "long" }) + " " + date.getFullYear()}
                </Text>
            </Box>
        );
    }

    function renderTransactions(transactions: Transaction[]) {
        return (
            <Box backgroundColor="white" style={styles.transactionWrapper}>
                {transactions.map((transaction, i) => (
                    <Box key={i}>
                        <TransactionListItem
                            transaction={transaction}
                            walletAddress={walletAddress}
                            navigation={navigation}
                        />
                    </Box>
                ))}
            </Box>
        );
    }

    if (displaySeparation) {
        return (
            <>
                {transactions.map((transaction, i, j) => (
                    <>
                        {/* I cannot think of a better way to index the headercomponents */}
                        {/* TODO find a better way of assigning a key to the transactionListItem and header */}
                        {renderHeader(new Date(transaction.createdAt.toString()), i + j.length)}
                        <Box key={i} backgroundColor="white" style={styles.transactionWrapper}>
                            <TransactionListItem
                                transaction={transaction}
                                walletAddress={walletAddress}
                                navigation={navigation}
                            />
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
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    transactionWrapper: {
        paddingLeft: 15,
        paddingRight: 15,
    },
});
