import React from "react";
import { ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { TransactionDetails } from "../components/TransactionDetails";
import { CompositeScreenProps } from "@react-navigation/native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";

export default function TransactionDetailsScreen(
    props: CompositeScreenProps<
        HomeStackScreenProps<"TransactionDetailsScreen">,
        SettingsStackScreenProps<"TransactionDetailsScreen">
    >,
) {
    return (
        <ScrollView style={styles.view}>
            <TransactionDetails
                transaction={props.route.params.transaction}
                walletAddress={props.route.params.walletAddress}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "white",
    },
});
