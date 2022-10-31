import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Text, Box, HStack, VStack } from "native-base";
import { HomeStackScreenProps } from "../types";
import { UsersGateway } from "../gateways/users_gateway";
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

    const usersGateway = new UsersGateway();
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

    function KeyValue(key: string, value: string) {
        return (
            <>
                <Text style={styles.label}>{key}</Text>
                <Text style={styles.value}>{value}</Text>
                <Box marginTop="20px"></Box>
            </>
        );
    }
    //const count = 15;
    return (
        <View style={styles.view}>
            <Text style={styles.header}>Wallet Details</Text>
            <Box marginTop="20px"></Box>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>
            <Box marginTop="20px"></Box>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{address.toLowerCase()}</Text>
            <Box marginTop="40px"></Box>
            <Text style={styles.header}>Transaction Details</Text>
            <Box marginTop="20px"></Box>
            <HStack justifyContent="space-between">
                <VStack>
                    <Text style={styles.value}>Transactions</Text>
                </VStack>
                <VStack>
                    <Text style={styles.value}>{count}</Text>
                </VStack>
            </HStack>
            <Box marginTop="20px"></Box>
            <Text style={styles.label}>Total Received</Text>
            <Text style={styles.value}>{totalReceived}</Text>
            <Box marginTop="20px"></Box>
            <Text style={styles.label}>Total Sent</Text>
            <Text style={styles.value}>{totalSent}</Text>
            <Box marginTop="20px"></Box>
            <Text style={styles.label}>Final Balance</Text>
            <Text style={styles.value}>{balance}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
    },
    header: {
        fontWeight: "600",
        fontSize: 20,
        lineHeight: 27,
    },
    label: {
        fontWeight: "400",
        fontSize: 15,
        lineHeight: 20,
        color: "#737373",
    },
    value: {
        fontWeight: "400",
        fontSize: 17,
        lineHeight: 23,
    },
    transactionCount: {
        fontWeight: "400",
        fontSize: 17,
        lineHeight: 23,
        color: "#737373",
    },
});
