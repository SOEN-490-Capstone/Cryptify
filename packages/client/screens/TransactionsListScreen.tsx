import React from "react";
import { StyleSheet } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { TransactionsList } from "../components/transactions-list/TransactionsList";
import { Pressable, Text, HStack, ScrollView } from "native-base";
import SortActionSheet from "./SortTransactionListScreen";
import SortService from "../services/sort_service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";


export default function TransactionsListScreen(
    props: CompositeScreenProps<
        HomeStackScreenProps<"TransactionsListScreen">,
        SettingsStackScreenProps<"TransactionsListScreen">
    >, 
) {

    const [sortedTransactions, setSort] = React.useState([...props.route.params.transactions])


    const [sortTransactionListValue, setTransactionListSortValue] = React.useState("sortDateNewest");


    const [showDateHeaders, setDateHeaders] = React.useState(true)

    React.useEffect(() => {
        (async () => {
            props.navigation.setOptions({
                headerRight: () => (
                    <SortActionSheet setTransactionListSortValue={setTransactionListSortValue} sortTransactionListValue={sortTransactionListValue} />
          ),
            });
        })();

    }, );

    React.useEffect(() => {
        sortTransactions();
    },[sortTransactionListValue]);

    const sortTransactions = () => {

        if (sortTransactionListValue === "sortDateNewest"){
            setSort(SortService.sort_date_newest([...sortedTransactions]));
                setDateHeaders(true);
        }

        if (sortTransactionListValue === "sortDateOldest"){
            setSort(SortService.sort_date_oldest([...sortedTransactions]));
                setDateHeaders(true);
        }

        if (sortTransactionListValue === "sortAmountHighest"){
            setSort(SortService.sort_amount_highest([...sortedTransactions]));
                setDateHeaders(false);
        }

        if (sortTransactionListValue === "sortAmountLowest"){
            setSort(SortService.sort_amount_lowest([...sortedTransactions]));
                setDateHeaders(false);
        }
    };

    return (
        <View style={styles.view}>
            <Text>{sortTransactionListValue}</Text>
            <TransactionsList
                transactions={sortedTransactions}
                walletAddress={props.route.params.walletAddress}
                displaySeparation={true}
                navigation={props.navigation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
