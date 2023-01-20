import React from "react";
import { ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { TransactionDetails } from "../components/TransactionDetails";
import { HomeStackScreenProps } from "../types";
import { View } from "../components/Themed";

export default function TransactionDetailsScreen(props: HomeStackScreenProps<"TransactionDetailsScreen">) {
    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                <TransactionDetails
                    txn={props.route.params.transaction}
                    wallet={props.route.params.wallet}
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
