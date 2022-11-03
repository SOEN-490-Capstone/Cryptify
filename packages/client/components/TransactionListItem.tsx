import React from "react";
import { Text, HStack, Box, VStack, Pressable } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { faCircleArrowDownLeftCustom } from "./icons/faCircleArrowDownLeftCustom";
import { faCircleArrowUpRightCustom } from "./icons/faCircleArrowUpRightCustom";
import { CompositeNavigationProp } from "@react-navigation/native";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { getFormattedAmount } from "../services/currency_service";

type Props = {
    transaction: Transaction;
    walletAddress: string;
    navigation: CompositeNavigationProp<any, any>;
};

export function TransactionListItem({ transaction, walletAddress, navigation }: Props) {
    const isIncommingTransaction = walletAddress == transaction.walletIn;

    function formatTransactionAddress(address: string): string {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
    }

    function getCurrencyType(): string {
        return transaction.transactionAddress.substring(0, 2) == "0x" ? "ETH" : "BTC";
    }

    function formatAmount(amount: string): string {
        return amount.length > 15 ? amount.substring(0, 15) + "..." : amount;
    }

    function getFromattedDate(date: Date): string {
        if (date == null) return "";
        const day = date.getDay();
        const year = date.getFullYear();
        const hour = date.getHours() % 12;
        const meridien = date.getHours() > 12 ? "PM" : "AM";
        const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        const month = date.toLocaleString("en-US", { month: "short" });

        return month + " " + day + ", " + year + " • " + hour + ":" + min + " " + meridien;
    }

    return (
        <Pressable
            testID={"transactionsListItem"}
            onPress={() =>
                navigation.navigate("TransactionDetailsScreen", {
                    title: "Monday",
                    transaction: transaction,
                    walletAddress: walletAddress,
                })
            }
        >
            <Box style={styles.transactionItemWrapper}>
                <HStack>
                    <FontAwesomeIcon
                        icon={isIncommingTransaction ? faCircleArrowDownLeftCustom : faCircleArrowUpRightCustom}
                        style={isIncommingTransaction ? styles.receiveIcon : styles.sendIcon}
                        size={30}
                    />
                    <VStack style={styles.verticalStack}>
                        <HStack>
                            <Text style={styles.transactionsAddress}>
                                {formatTransactionAddress(transaction.transactionAddress)}
                            </Text>
                            <Text
                                color={isIncommingTransaction ? "success.600" : "text.700"}
                                style={
                                    isIncommingTransaction ? styles.transactionAmountIn : styles.transactionAmountOut
                                }
                            >
                                {isIncommingTransaction ? "+" : "-"}
                                {/* TODO fomat amount only once and find a way to add elipsis dynamically */}
                                {formatAmount(getFormattedAmount(transaction.amount, CurrencyType.ETHEREUM))}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text color="text.500" style={styles.transactionDate}>
                                {/* For some reason the transaction.createdAt does not have the "day" attributes */}
                                {/* TODO fix the attributes in the transaction */}
                                {getFromattedDate(new Date(transaction.createdAt.toString()))}
                            </Text>
                            <Text color="text.500" style={styles.transactionCurrency}>
                                {getCurrencyType()}
                            </Text>
                        </HStack>
                    </VStack>
                </HStack>
            </Box>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    sendIcon: {
        //text.700
        color: "#404040",
        marginLeft: 0,
        marginRight: 10,
        alignSelf: "center",
    },
    receiveIcon: {
        //success.600
        color: "#16A34A",
        marginLeft: 0,
        marginRight: 10,
        alignSelf: "center",
    },
    verticalStack: {
        flex: 1,
    },
    transactionsAddress: {
        paddingRight: 5,
        fontSize: 17,
        fontWeight: "600",
    },
    transactionAmountOut: {
        marginLeft: "auto",
        fontSize: 17,
        fontWeight: "600",
    },
    transactionAmountIn: {
        marginLeft: "auto",
        fontSize: 17,
        fontWeight: "600",
    },
    transactionDate: {
        fontSize: 15,
    },
    transactionCurrency: {
        fontSize: 15,
        marginLeft: "auto",
    },
    transactionItemWrapper: {
        paddingVertical: 12,
    },
});
