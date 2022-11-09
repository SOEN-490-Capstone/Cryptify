import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Text, Box, HStack } from "native-base";
import { HomeStackScreenProps } from "../types";
import {
    getTransactionCount,
    getTransactionTotalReceived,
    getTransactionTotalSent,
} from "../services/transaction_service";
import React from "react";
import RowItem from "../components/RowItem";
import { Copy } from "../components/Copy";

type Props = HomeStackScreenProps<"WalletDetailsScreen">;

export default function WalletDetailsScreen({ route }: Props) {
    const { address, name, balance, transactions } = route.params;

    const count = getTransactionCount(transactions);
    const totalReceived = getTransactionTotalReceived(transactions);
    const totalSent = getTransactionTotalSent(transactions);

    return (
        <View style={styles.view}>
            <Text size={"title3"} fontWeight={"semibold"}>
                Wallet Details
            </Text>
            <Box marginTop="20px"></Box>
            <RowItem label="Name" value={name} />
            <HStack space="10px">
                <Text style={{ ...styles.address }}>{address}</Text>
                <Copy label="Address" value={address} />
            </HStack>
            <Box marginTop="20px"></Box>
            <Text size={"title3"} fontWeight={"semibold"}>
                Transaction Details
            </Text>
            <Box marginTop="20px"></Box>
            <HStack justifyContent="space-between">
                <Text>Transactions</Text>
                <Text color={"text.500"}>{count}</Text>
            </HStack>
            <Box marginTop="20px"></Box>
            <RowItem label="Total Received" value={totalReceived} />
            <RowItem label="Total Sent" value={totalSent} />
            <RowItem label="Final Balance" value={balance} />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 20,
    },
    address: {
        flex: 1,
    },
});
