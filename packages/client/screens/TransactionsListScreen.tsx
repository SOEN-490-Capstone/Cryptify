import React from "react";
import { ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { TransactionDetails } from "../components/TransactionDetails";
import { CompositeScreenProps } from "@react-navigation/native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { TransactionList } from "../components/TransactionList";

export default function TransactionsListScreen(
    props: CompositeScreenProps<
        HomeStackScreenProps<"TransactionsListScreen">,
        SettingsStackScreenProps<"TransactionsListScreen">
    >,
) {
    return (
        <View style={styles.view}>
            <ScrollView>
                <TransactionList
                    transactions={props.route.params.transactions}
                    walletAddress={props.route.params.walletAddress} 
                    displaySeparation={true} navigation={props.navigation}                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
