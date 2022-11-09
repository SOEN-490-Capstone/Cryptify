import React from "react";
import { Text, HStack, Box, VStack, Pressable } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { faCircleArrowDownLeft } from "./icons/light/faCircleArrowDownLeft";
import { faCircleArrowUpRight } from "./icons/light/faCircleArrowUpRight";
import { CompositeNavigationProp } from "@react-navigation/native";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { getFormattedAmount } from "../services/currency_service";
import { formatAddress } from "../services/address_service";

type Props = {
    transaction: Transaction;
    walletAddress: string;
    navigation: CompositeNavigationProp<any, any>;
};

export function TransactionListItem({ transaction, walletAddress, navigation }: Props) {
    const isIncommingTransaction = walletAddress == transaction.walletIn;

    function getCurrencyType(): string {
        return transaction.transactionAddress.substring(0, 2) == "0x" ? "ETH" : "BTC";
    }

    function getFormattedDate(timestamp: string): string {
        const date = new Date(timestamp);
        const datePart = date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const timePart = date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit" });
        return `${datePart} • ${timePart}`;
    }

    function getWeekday(timestamp: string): string {
        const date = new Date(timestamp);
        return date.toLocaleString("en-US", { weekday: "long" });
    }

    return (
        <Pressable
            testID={"transactionsListItem"}
            onPress={() =>
                navigation.navigate("TransactionDetailsScreen", {
                    title: getWeekday(transaction.createdAt as any),
                    transaction: transaction,
                    walletAddress: walletAddress,
                })
            }
        >
            <Box style={styles.transactionItemWrapper}>
                <HStack>
                    <FontAwesomeIcon
                        icon={isIncommingTransaction ? faCircleArrowDownLeft : faCircleArrowUpRight}
                        style={isIncommingTransaction ? styles.receiveIcon : styles.sendIcon}
                        size={30}
                    />
                    <VStack style={styles.verticalStack}>
                        <HStack>
                            <Text style={styles.transactionsAddress}>
                                {formatAddress(transaction.transactionAddress)}
                            </Text>
                            <Text
                                isTruncated
                                color={isIncommingTransaction ? "success.600" : "text.700"}
                                style={
                                    isIncommingTransaction ? styles.transactionAmountIn : styles.transactionAmountOut
                                }
                            >
                                {isIncommingTransaction ? "+" : "-"}
                                {getFormattedAmount(transaction.amount, CurrencyType.ETHEREUM)}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text color="text.500" style={styles.transactionDate}>
                                {getFormattedDate(transaction.createdAt as any)}
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
