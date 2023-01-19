import React from "react";
import { ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { TransactionDetails } from "../components/TransactionDetails";
import { CompositeScreenProps } from "@react-navigation/native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { View } from "../components/Themed";

export default function TransactionDetailsScreen(
    props: CompositeScreenProps<
        HomeStackScreenProps<"TransactionDetailsScreen">,
        SettingsStackScreenProps<"TransactionDetailsScreen">
    >,
) {
    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                <TransactionDetails
                    txn={props.route.params.transaction}
                    walletAddress={props.route.params.walletAddress}
                    walletName={props.route.params.walletName}
                    navigation={props.navigation}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: 15,
    },
});
