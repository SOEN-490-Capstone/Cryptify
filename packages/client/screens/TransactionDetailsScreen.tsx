import React from "react";
import { ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { BitcoinTransactionDetails } from "../components/transaction-details/BitcoinTransactionDetails";
import { EthereumTransactionDetails } from "../components/transaction-details/EthereumTransactionDetails";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"TransactionDetailsScreen">,
    SettingsStackScreenProps<"TransactionDetailsScreen">
>;

export default function TransactionDetailsScreen({ route, navigation }: Props) {
    const { transaction, walletAddress } = route.params;

    const renderTransactionDetails = (currencyType: CurrencyType) => {
        if (currencyType === CurrencyType.BITCOIN) {
            return (
                <BitcoinTransactionDetails
                    transaction={transaction}
                    walletAddress={walletAddress}
                    navigation={navigation}
                />
            );
        } else if (currencyType === CurrencyType.ETHEREUM) {
            return (
                <EthereumTransactionDetails
                    transaction={transaction}
                    walletAddress={walletAddress}
                    navigation={navigation}
                />
            );
        }
    };

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                {renderTransactionDetails(getCurrencyType(walletAddress))}
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
