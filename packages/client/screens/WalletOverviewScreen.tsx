import React from "react";
import { HomeStackScreenProps } from "../types";
import { Pressable, Box, Text, HStack, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View } from "../components/Themed";
import { farArrowRight } from "../components/icons/regular/farArrowRight";
import { useIsFocused } from "@react-navigation/native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionsGateway } from "../gateways/transactions_gateway";
import { AuthContext } from "../components/contexts/AuthContext";
import { falMagnifyingGlass } from "../components/icons/light/falMagnifyingGlass";
import { farQrCode } from "../components/icons/regular/farQrCode";
import { getTransactionByWallet } from "../services/transaction_service";
import { TransactionsList } from "../components/transactions-list/TransactionsList";
import SortService from "../services/sort_service";
import { farWallet } from "../components/icons/regular/farWallet";
import { farFile } from "../components/icons/regular/farFile";
import WalletDetailsComponent from "../components/WalletDetailsComponent";

export default function WalletOverviewScreen({ route, navigation }: HomeStackScreenProps<"WalletOverviewScreen">) {
    const wallet = route.params.wallet;

    const transactionGateway = new TransactionsGateway();

    const { token, user } = React.useContext(AuthContext);

    const [isLoading, setIsLoading] = React.useState(true);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);

    const isFocused = useIsFocused();

    React.useEffect(() => {
        (async () => {
            if (isFocused) {
                const transactions = await transactionGateway.findAllTransactions({ id: user.id }, token);
                setTransactions(SortService.sortDateNewest(getTransactionByWallet(transactions, wallet.address)));
                setIsLoading(false);
            }
        })();
    }, [isFocused]);
    return (
        <View style={styles.view}>
            <WalletDetailsComponent wallet={wallet} />
            <Box marginTop="20px"></Box>
            <HStack paddingX="38px" justifyContent="space-between">
                <VStack space="4px">
                    <Pressable
                        testID="walletDetailsButton"
                        style={styles.button}
                        onPress={() =>
                            navigation.navigate("WalletDetailsScreen", {
                                wallet,
                                transactions,
                            })
                        }
                    >
                        <Box style={styles.walletIconBackground}>
                            <FontAwesomeIcon icon={farWallet} style={styles.walletIcon} size={20} />
                        </Box>
                    </Pressable>
                    <Text size={"subheadline"} fontWeight={"semibold"}>
                        Details
                    </Text>
                </VStack>
                <VStack space="4px">
                    <Pressable
                        testID="walletQRCodeButton"
                        style={styles.button}
                        onPress={() => navigation.navigate("WalletQRCodeScreen", { wallet })}
                    >
                        <Box style={styles.walletIconBackground}>
                            <FontAwesomeIcon icon={farQrCode} style={styles.walletIcon} size={20} />
                        </Box>
                    </Pressable>
                    <Text size={"subheadline"} fontWeight={"semibold"}>
                        QR Code
                    </Text>
                </VStack>
                <VStack space="4px">
                    <Pressable
                        testID="walletDocumentsButton"
                        style={styles.button}
                        onPress={() =>
                            navigation.navigate("ReportSelectionScreen", {
                                wallet,
                            })
                        }
                    >
                        <Box style={styles.walletIconBackground}>
                            <FontAwesomeIcon icon={farFile} style={styles.walletIcon} size={20} />
                        </Box>
                    </Pressable>
                    <Text size={"subheadline"} fontWeight={"semibold"}>
                        Documents
                    </Text>
                </VStack>
            </HStack>
            <HStack style={styles.transactionBox} testID="transactionsListHeader">
                <Text size={"title3"} fontWeight={"semibold"} style={styles.transactions}>
                    Transactions
                </Text>
                {transactions.length !== 0 && (
                    <Pressable
                        testID="transactionsListButton"
                        onPress={() =>
                            navigation.navigate("TransactionsListScreen", {
                                transactions: [...transactions],
                                wallet,
                                displaySeparation: true,
                            })
                        }
                        style={styles.rightArrowIcon}
                    >
                        <FontAwesomeIcon icon={farArrowRight} size={22} />
                    </Pressable>
                )}
            </HStack>
            {isLoading || transactions.length > 0 ? (
                <TransactionsList
                    transactions={transactions}
                    wallet={wallet}
                    displaySeparation={false}
                    navigation={navigation}
                />
            ) : (
                <VStack style={styles.magnifyingGlass} margin="auto">
                    <FontAwesomeIcon icon={falMagnifyingGlass} size={48} />
                    <Text style={styles.magnifyingGlassText}>We could not find any transactions.</Text>
                </VStack>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    walletIcon: {
        color: "#404040",
        lineHeight: 20,
    },
    walletIconBackground: {
        backgroundColor: "rgba(60, 60, 61, 0.15)",
        padding: 12,
        borderRadius: 50,
    },
    button: {
        alignContent: "center",
        alignItems: "center",
    },
    transactionBox: {
        marginBottom: 20,
        marginTop: 30,
    },
    transactions: {
        paddingLeft: 15,
    },
    rightArrowIcon: {
        marginLeft: "auto",
        paddingRight: 15,
    },
    magnifyingGlass: {
        alignItems: "center",
    },
    magnifyingGlassText: {
        marginTop: 15,
    },
});
