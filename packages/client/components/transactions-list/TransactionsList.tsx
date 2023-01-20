import React from "react";
import { Text, Box, FlatList } from "native-base";
import { StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionListItem } from "./TransactionListItem";
import { CompositeNavigationProp } from "@react-navigation/native";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";

type Props = {
    wallet: WalletWithBalance;
    transactions: Transaction[];
    displaySeparation: boolean;
    navigation: CompositeNavigationProp<any, any>;
};

export function TransactionsList({ transactions, wallet, displaySeparation, navigation }: Props) {
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
                        <TransactionListItem transaction={item} wallet={wallet} navigation={navigation} />
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
