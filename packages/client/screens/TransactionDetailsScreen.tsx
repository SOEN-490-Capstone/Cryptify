import React from "react";
import { ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { TransactionDetails } from "../components/TransactionDetails";
import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { TransactionsGateway } from "../gateways/transactions_gateway";
import { AuthContext } from "../components/contexts/AuthContext";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

export default function TransactionDetailsScreen(
    props: CompositeScreenProps<
        HomeStackScreenProps<"TransactionDetailsScreen">,
        SettingsStackScreenProps<"TransactionDetailsScreen">
    >,
) {
    const transactionGateway = new TransactionsGateway();

    const { token, user } = React.useContext(AuthContext);
    const isFocused = useIsFocused();

    const [transaction, setTransaction] = React.useState<Transaction>(props.route.params.transaction);

    React.useEffect(() => {
        if (isFocused) {
            (async () => {
                const transactions = await transactionGateway.findAllTransactions({ id: user.id }, token);
                setTransaction(transactions.filter((t) => t.id === props.route.params.transaction.id)[0]);
            })();
        }
    }, [isFocused]);

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                <TransactionDetails
                    transaction={transaction}
                    setTransaction={setTransaction}
                    walletAddress={props.route.params.walletAddress}
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
        paddingHorizontal: 20,
    },
});
