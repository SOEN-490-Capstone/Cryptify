import React from "react";
import { Text, Box, FlatList } from "native-base";
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

export function TransactionsList({ transactions, walletAddress, displaySeparation, navigation }: Props) {
    let savedDate = new Date();
    function renderHeader(date: Date) {
        if (savedDate?.getFullYear() == date.getFullYear() && savedDate.getMonth() == date.getMonth()) {
            savedDate = date;
            return;
        }
        savedDate = date;
        return (
            <Box backgroundColor="text.100" testID="transactionsDateSeparator">
                <Text fontWeight={"semibold"} color="text.500" style={styles.dateSeparator}>
                    {date.toLocaleString("en-US", { month: "long" }) + " " + date.getFullYear()}
                </Text>
            </Box>
        );
    }

    return (
        <FlatList
            data={transactions}
            renderItem={({ item }) => (
                <>
                    {displaySeparation && renderHeader(new Date(item.createdAt.toString()))}
                    <Box style={styles.transactionWrapper}>
                        <TransactionListItem transaction={item} walletAddress={walletAddress} navigation={navigation} />
                    </Box>
                </>
            )}
            testID="transactionsList"
        />
    );
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
