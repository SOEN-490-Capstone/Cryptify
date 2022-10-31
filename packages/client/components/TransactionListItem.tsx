import React from "react";
import { Text, HStack, Box, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { faCircleArrowDownLeftCustom } from "./icons/faCircleArrowDownLeftCustom";
import { faCircleArrowUpRightCustom } from "./icons/faCircleArrowUpRightCustom";

type Props = {
    transaction: Transaction;
    walletAddress: string;
};

export function TransactionListItem({ transaction, walletAddress }: Props) {
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
        const day = date.getDay();
        const year = date.getFullYear();
        const hour = date.getHours() % 12;
        const meridien = date.getHours() > 12 ? "PM" : "AM";
        const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        const month = date.toLocaleString("en-US", { month: "short" });

        return month + " " + day + ", " + year + " • " + hour + ":" + min + " " + meridien;
    }

    return (
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
                            color={isIncommingTransaction ? "success.600" : "text.600"}
                            style={isIncommingTransaction ? styles.transactionAmountIn : styles.transactionAmountOut}
                        >
                            {isIncommingTransaction ? "+" : "-"}
                            {formatAmount(transaction.amount)}
                        </Text>
                    </HStack>
                    <HStack>
                        <Text color="text.500" style={styles.transactionDate}>
                            {getFromattedDate(transaction.createdAt)}
                        </Text>
                        <Text color="text.500" style={styles.transactionCurrency}>
                            {getCurrencyType()}
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
        </Box>
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
