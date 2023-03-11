import React from "react";
import { Text, Box, FlatList } from "native-base";
import { ListRenderItemInfo, StyleSheet } from "react-native";
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
    const [transactionsWithHeader, setTransactionsWithHeader] = React.useState<DataWithHeader<Transaction>[]>([]);

    React.useEffect(() => {
        (() => {
            let currDate = "";
            const listData = transactions.flatMap((transaction) => {
                const txnDate = new Date(transaction.createdAt);
                const date = txnDate.toLocaleString("en-US", { month: "long" }) + " " + txnDate.getFullYear();
                if (displaySeparation && date !== currDate) {
                    currDate = date;
                    return [
                        {
                            data: {
                                ...transaction,
                                name: currDate,
                            },
                            header: true,
                        },
                        { data: transaction, header: false },
                    ];
                } else {
                    return [{ data: transaction, header: false }];
                }
            });

            setTransactionsWithHeader(listData);
        })();
    }, [transactions]);

    function renderItem(rowData: ListRenderItemInfo<DataWithHeader<Transaction>>) {
        const txnDate = new Date(rowData.item.data.createdAt);
        return (
            <>
                {rowData.item.header ? (
                    <Box backgroundColor="text.100" testID="transactionsDateSeparator">
                        <Text fontWeight={"semibold"} color="text.500" style={styles.dateSeparator}>
                            {txnDate.toLocaleString("en-US", { month: "long" }) + " " + txnDate.getFullYear()}
                        </Text>
                    </Box>
                ) : (
                    <Box style={styles.transactionWrapper}>
                        <TransactionListItem transaction={rowData.item.data} wallet={wallet} navigation={navigation} />
                    </Box>
                )}
            </>
        );
    }

    return <FlatList data={transactionsWithHeader} renderItem={renderItem} testID="transactionsList" />;
}

type DataWithHeader<T> = {
    data: T;
    header: boolean;
};

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
