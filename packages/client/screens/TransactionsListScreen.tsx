import React from "react";
import { ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { TransactionList } from "../components/TransactionList";

export default function TransactionsListScreen(
    props: CompositeScreenProps<
        HomeStackScreenProps<"TransactionsListScreen">,
        SettingsStackScreenProps<"TransactionsListScreen">
    >,
) {
    return (
        <ScrollView style={styles.view}>
            <TransactionList
                transactions={props.route.params.transactions}
                walletAddress={props.route.params.walletAddress}
                displaySeparation={true}
                navigation={props.navigation}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
