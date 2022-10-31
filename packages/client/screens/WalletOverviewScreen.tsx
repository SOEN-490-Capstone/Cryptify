import React from "react";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { Pressable, Box, Text, HStack, VStack, Center, ScrollView } from "native-base";
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
            setTransactions(transactions);
        })();
    }, []);

    function formatWalletAddress(address: string): string {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
    }

    return (
        <View style={styles.view}>
            <Box style={styles.walletDetailsWrapper}>
                <VStack style={styles.walletDetails}>
                    <HStack justifyContent="space-between">
                        <VStack>
                            <Text style={styles.walletName}>{name}</Text>
                            <Box marginTop="2px"></Box>
                            <Text style={styles.walletAddress}>{formatWalletAddress(address)}</Text>
                        </VStack>
                        <VStack>
                            <FontAwesomeIcon icon={faEthereumCustom} style={styles.ethereumIcon} size={40} />
                        </VStack>
                    </HStack>
                    <HStack alignItems="center">
                        <VStack>
                            <Box marginTop="40px" marginBottom="0"></Box>
                            <Text style={styles.currencyType}>{currencyType}</Text>
                            <Text style={styles.walletBalance}>{balance}</Text>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
            <Box marginTop="20px" marginBottom="0"></Box>
            <Center>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate("WalletDetailsScreen", { address, name, currencyType, balance })}
                >
                    <Box style={styles.walletIconBackground}>
                        <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={20} />
                    </Box>
                </Pressable>
                <Box marginTop="4px"></Box>
                <Text style={styles.detailsText}>Details</Text>
            </Center>
            <HStack>
                <Text style={styles.transactions}>
                    Transactions
                </Text>
                <Pressable onPress={() => navigation.navigate("TransactionsListScreen", {
                            transactions: transactions,
                            walletAddress: address,
                            displaySeparation: true,
                        })} style={styles.rightArrowIcon}>
                    <FontAwesomeIcon icon={faArrowRightCustom} size={22} />
                </Pressable>
            </HStack>
            <ScrollView>
                <TransactionList transactions={transactions} walletAddress={address} displaySeparation={false} navigation={navigation}/>
            </ScrollView>
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
    walletName: {
        fontSize: 17,
        lineHeight: 23,
    },
    walletAddress: {
        fontSize: 15,
        lineHeight: 20,
        color: "#737373",
    },
    currencyType: {
        fontSize: 15,
        lineHeight: 20,
        color: "#737373",
    },
    walletBalance: {
        fontSize: 20,
        lineHeight: 27,
    },
    walletIcon: {
        color: "#404040",
        fontWeight: "400",
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
    detailsText: {
        fontWeight: "600",
        fontSize: 15,
        lineHeight: 20,
    },
    transactions: {
        fontWeight: "600",
        fontSize: 20,
        paddingLeft: 15,
    },
    rightArrowIcon: {
        marginLeft: "auto",
        paddingRight: 15,

    }
});
