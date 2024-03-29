import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Text, VStack } from "native-base";
import { HomeStackScreenProps } from "../types";
import {
    getTransactionCount,
    getTransactionTotalReceived,
    getTransactionTotalSent,
} from "../services/transaction_service";
import React from "react";
import MultiLineListItem from "../components/list/MultiLineListItem";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import SingleLineListItem from "../components/list/SingleLineListItem";

type Props = HomeStackScreenProps<"WalletDetailsScreen">;

export default function WalletDetailsScreen({ route }: Props) {
    const wallet = route.params.wallet;
    const count = getTransactionCount(route.params.transactions);
    const type = getCurrencyType(wallet.address);
    const totalReceived = getTransactionTotalReceived(wallet.address, route.params.transactions, type);
    const totalSent = getTransactionTotalSent(wallet.address, route.params.transactions, type);

    return (
        <View style={styles.view}>
            <VStack space={"40px"}>
                <VStack space={"20px"}>
                    <Text size={"title3"} fontWeight={"semibold"}>
                        Wallet Details
                    </Text>

                    <MultiLineListItem label="Name" value={wallet.name} />
                    <MultiLineListItem label="Address" value={wallet.address} copy={true} />
                </VStack>
                <VStack space={"20px"}>
                    <Text size={"title3"} fontWeight={"semibold"}>
                        Transaction Details
                    </Text>

                    <SingleLineListItem label="Transactions" value={count.toString()} />
                    <MultiLineListItem label="Total Received" value={totalReceived} />
                    <MultiLineListItem label="Total Sent" value={totalSent} />
                    <MultiLineListItem label="Final Balance" value={wallet.balance} />
                </VStack>
            </VStack>
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
});
