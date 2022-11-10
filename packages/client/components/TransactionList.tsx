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
    function renderHeader(date: Date) {
        if (savedDate?.getFullYear() == date.getFullYear() && savedDate.getMonth() == date.getMonth()) {
            savedDate = date;
            return;
        }
        savedDate = date;
        return (
            <Box key={+date} backgroundColor="text.100" testID="transactionsDateSeparator">
                <Text fontWeight={"semibold"} color="text.500" style={styles.dateSeparator}>
                    {date.toLocaleString("en-US", { month: "long" }) + " " + date.getFullYear()}
                </Text>
            </Box>
        );
    }

    function renderTransactions(transactions: Transaction[]) {
        return (
            <Box backgroundColor="white" style={styles.transactionWrapper}>
                {transactions.map((transaction, i) => (
                    <Box key={i} testID="transactionWithoutSeparation">
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
                {transactions.map((transaction, i) => (
                    <Box key={i}>
                        {renderHeader(new Date(transaction.createdAt.toString()))}
                        <Box
                            backgroundColor="white"
                            style={styles.transactionWrapper}
                            testID="transactionWithSepartion"
                        >
                            <TransactionListItem
                                transaction={transaction}
                                walletAddress={walletAddress}
                                navigation={navigation}
                            />
                        </Box>
                    </Box>
                ))}
            </>
        );
    }
    return <>{renderTransactions(transactions)}</>;
}

const styles = StyleSheet.create({
    dateSeparator: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    transactionWrapper: {
        paddingLeft: 15,
        paddingRight: 15,
    },
});
