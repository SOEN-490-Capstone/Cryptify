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
import { currencyTypeToIcon } from "../services/currency_service";
import SortService from "../services/sort_service";
import { getFormattedAmount, typeToISOCode } from "@cryptify/common/src/utils/currency_utils";
import { formatAddress } from "@cryptify/common/src/utils/address_utils";
import { farWallet } from "../components/icons/regular/farWallet";
import { farFile } from "../components/icons/regular/farFile";

export default function WalletOverviewScreen({ route, navigation }: HomeStackScreenProps<"WalletOverviewScreen">) {
    const wallet = route.params.wallet;

    const transactionGateway = new TransactionsGateway();

    const { token, user } = React.useContext(AuthContext);

    const [isLoading, setIsLoading] = React.useState(true);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const currencyIcon = currencyTypeToIcon[wallet.currencyType];

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
            <Box
                style={styles.walletDetailsWrapper}
                backgroundColor={
                    wallet.currencyType == "BITCOIN" ? "rgba(247, 147, 26, 0.25)" : "rgba(60, 60, 61, 0.25)"
                }
            >
                <VStack style={styles.walletDetails}>
                    <HStack justifyContent="space-between">
                        <VStack>
                            <Text>{wallet.name}</Text>
                            <Box marginTop="2px"></Box>
                            <Text size={"subheadline"} color={"text.500"}>
                                {formatAddress(wallet.address)}
                            </Text>
                        </VStack>
                        <VStack>
                            <FontAwesomeIcon
                                icon={currencyIcon}
                                color={wallet.currencyType == "BITCOIN" ? "#F7931A" : "#3C3C3D"}
                                size={40}
                            />
                        </VStack>
                    </HStack>
                    <HStack alignItems="center">
                        <VStack>
                            <Box marginTop="40px" marginBottom="0"></Box>
                            <Text size={"subheadline"} color={"text.500"}>
                                {typeToISOCode[wallet.currencyType]}
                            </Text>
                            <Text size={"title3"}>{getFormattedAmount(wallet.balance, wallet.currencyType)}</Text>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
            <Box marginTop="20px" marginBottom="0"></Box>
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
                {transactions.length != 0 && (
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
    walletDetailsWrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        marginHorizontal: 15,
        borderRadius: 10,
    },
    walletDetails: {
        paddingVertical: 20,
        paddingRight: 0,
        borderTopWidth: 1,
        borderColor: "#E5E5E5",
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
