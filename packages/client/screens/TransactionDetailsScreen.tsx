import React from "react";
import { ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { HomeStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { BitcoinTransactionDetails } from "../components/transaction-details/BitcoinTransactionDetails";
import { EthereumTransactionDetails } from "../components/transaction-details/EthereumTransactionDetails";

export default function TransactionDetailsScreen({
    route,
    navigation,
}: HomeStackScreenProps<"TransactionDetailsScreen">) {
    const { transaction, wallet } = route.params;

    const renderTransactionDetails = (currencyType: CurrencyType) => {
        if (currencyType === CurrencyType.BITCOIN) {
            return <BitcoinTransactionDetails transaction={transaction} wallet={wallet} navigation={navigation} />;
        } else if (currencyType === CurrencyType.ETHEREUM) {
            return <EthereumTransactionDetails transaction={transaction} wallet={wallet} navigation={navigation} />;
        }
    };

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>{renderTransactionDetails(wallet.currencyType)}</ScrollView>
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
