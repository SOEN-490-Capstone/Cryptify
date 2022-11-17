import React from "react";
import { StyleSheet } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { TransactionsList } from "../components/transactions-list/TransactionsList";
import { Pressable, Box, Text, HStack, VStack } from "native-base";

export default function TransactionsListScreen(
    props: CompositeScreenProps<
        HomeStackScreenProps<"TransactionsListScreen">,
        SettingsStackScreenProps<"TransactionsListScreen">
    >,
) {

    return (
        <View style={styles.view}>
            <Text>{props.route.params.filters[0]}</Text>
            <TransactionsList
                transactions={props.route.params.transactions}
                walletAddress={props.route.params.walletAddress}
                displaySeparation={true}
                navigation={props.navigation}
                filters={props.route.params.filters}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
