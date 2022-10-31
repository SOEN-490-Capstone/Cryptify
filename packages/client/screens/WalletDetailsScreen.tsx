import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Text, Box, HStack } from "native-base";
import { HomeStackScreenProps } from "../types";
import { TransactionsGateway } from "../gateways/transactions_gateway";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import {
    getTransactionCount,
    getTransactionTotalReceived,
    getTransactionTotalSent,
} from "../services/transaction_service";
import React from "react";
import { AuthContext } from "../components/contexts/AuthContext";

type Props = HomeStackScreenProps<"WalletDetailsScreen">;

export default function WalletDetailsScreen({ route }: Props) {
    const { address, name, balance } = route.params;

    const transactionGateway = new TransactionsGateway();

    const { token, user } = React.useContext(AuthContext);

    const [transactions, setTransactions] = React.useState<Transaction[]>([]);

    React.useEffect(() => {
        (async () => {
            const transactions = await transactionGateway.findAllTransactions({ id: user.id }, token);
            setTransactions(transactions);
        })();
    }, []);

    const count = getTransactionCount(transactions, address);
    const totalReceived = getTransactionTotalReceived(transactions, address);
    const totalSent = getTransactionTotalSent(transactions, address);

    type KeyValueProps = {
        label: string;
        value: string;
    };

    function RowItem({ label, value }: KeyValueProps) {
        return (
            <>
                <Text style={{ ...styles.label, color: "text.500" }}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
                <Box marginTop="20px"></Box>
            </>
        );
    }

    return (
        <View style={styles.view}>
            <Text style={styles.header}>Wallet Details</Text>
            <Box marginTop="20px"></Box>
            <RowItem label="Name" value={name} />
            <RowItem label="Address" value={address.toLocaleLowerCase()} />
            <Box marginTop="20px"></Box>
            <Text style={styles.header}>Transaction Details</Text>
            <Box marginTop="20px"></Box>
            <HStack justifyContent="space-between">
                <Text style={styles.value}>Transactions</Text>
                <Text style={{ ...styles.value, color: "text.500" }}>{count}</Text>
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
    header: {
        fontWeight: "600",
        fontSize: 20,
        lineHeight: 27,
    },
    label: {
        fontSize: 15,
        lineHeight: 20,
    },
    value: {
        fontSize: 17,
        lineHeight: 23,
    },
});
