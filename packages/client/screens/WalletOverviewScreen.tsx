import React from "react";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { Pressable, Box, Text, HStack, VStack, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { faWalletCustom } from "../components/icons/faWalletCustom";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View } from "../components/Themed";
import { faEthereumCustom } from "../components/icons/faEthereumCustom";
import { faArrowRightCustom } from "../components/icons/faArrowRightCustom";
import { CompositeScreenProps } from "@react-navigation/native";
import { TransactionList } from "../components/TransactionList";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionsGateway } from "../gateways/transactions_gateway";
import { AuthContext } from "../components/contexts/AuthContext";
import { faMagnifyingGlassCustom } from "../components/icons/faMagnifyingGlassCustom";
import { faQrCodeCustom } from "../components/icons/faQrCodeCustom";
import { getTransactionByWallet } from "../services/transaction_service";
import { formatAddress } from "../services/address_service";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"WalletOverviewScreen">,
    SettingsStackScreenProps<"WalletOverviewScreen">
>;

export default function WalletOverviewScreen({ route, navigation }: Props) {
    const { address, name, currencyType, balance } = route.params;

    const transactionGateway = new TransactionsGateway();

    const { token, user } = React.useContext(AuthContext);

    const [transactions, setTransactions] = React.useState<Transaction[]>([]);

    React.useEffect(() => {
        (async () => {
            const transactions = await transactionGateway.findAllTransactions({ id: user.id }, token);
            //TODO sort the transactions by date
            setTransactions(getTransactionByWallet(transactions, address));
        })();
    }, []);

    return (
        <View style={styles.view}>
            <Box style={styles.walletDetailsWrapper}>
                <VStack style={styles.walletDetails}>
                    <HStack justifyContent="space-between">
                        <VStack>
                            <Text>{name}</Text>
                            <Box marginTop="2px"></Box>
                            <Text size={"subheadline"} color={"text.500"}>
                                {formatAddress(address)}
                            </Text>
                        </VStack>
                        <VStack>
                            <FontAwesomeIcon icon={faEthereumCustom} style={styles.ethereumIcon} size={40} />
                        </VStack>
                    </HStack>
                    <HStack alignItems="center">
                        <VStack>
                            <Box marginTop="40px" marginBottom="0"></Box>
                            <Text size={"subheadline"} color={"text.500"}>
                                {currencyType}
                            </Text>
                            <Text size={"title3"}>{balance}</Text>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
            <Box marginTop="20px" marginBottom="0"></Box>
            <HStack paddingX="83px" justifyContent="space-between">
                <VStack space="4px">
                    <Pressable
                        testID="walletDetailsButton"
                        style={styles.button}
                        onPress={() =>
                            navigation.navigate("WalletDetailsScreen", {
                                address,
                                name,
                                currencyType,
                                balance,
                                transactions,
                            })
                        }
                    >
                        <Box style={styles.walletIconBackground}>
                            <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={20} />
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
                        onPress={() => navigation.navigate("WalletQRCodeScreen", { address, name, currencyType })}
                    >
                        <Box style={styles.walletIconBackground}>
                            <FontAwesomeIcon icon={faQrCodeCustom} style={styles.walletIcon} size={20} />
                        </Box>
                    </Pressable>
                    <Text size={"subheadline"} fontWeight={"semibold"}>
                        QR Code
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
                                transactions: transactions,
                                walletAddress: address,
                                displaySeparation: true,
                            })
                        }
                        style={styles.rightArrowIcon}
                    >
                        <FontAwesomeIcon icon={faArrowRightCustom} size={22} />
                    </Pressable>
                )}
            </HStack>
            {transactions.length == 0 ? (
                <VStack style={styles.magnifyingGlass} margin="auto">
                    <FontAwesomeIcon icon={faMagnifyingGlassCustom} size={48} />
                    <Text style={styles.magnifyingGlassText}>We could not find any transactions.</Text>
                </VStack>
            ) : (
                <ScrollView testID="transactionsList">
                    <TransactionList
                        transactions={transactions}
                        walletAddress={address}
                        displaySeparation={false}
                        navigation={navigation}
                    />
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    ethereumIcon: {
        color: "#3C3C3D",
    },
    walletDetailsWrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        marginHorizontal: 15,
        backgroundColor: "rgba(60, 60, 61, 0.25)",
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
