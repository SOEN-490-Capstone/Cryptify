import React from "react";
import { Text, HStack, Box, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { faCircleArrowDownLeftCustom } from "./icons/faCircleArrowDownLeftCustom";
import { faCircleArrowUpRightCustom } from "./icons/faCircleArrowUpRightCustom";

type Props = {
    transactions: Transaction;
    wallet: string;
};

export function FormatTransaction({ transactions, wallet }: Props) {
    function formatTransactionAddress(address: string): string {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
    }

    function getCurrencyType(): string {
        return transactions.transactionAddress.substring(0, 2) == "0x" ? "ETH" : "BTC";
    }

    function getFromattedDate(date: Date): string {
        const day = date.getDay();
        const year = date.getFullYear();
        const hour = date.getHours() % 12;
        const meridien = date.getHours() > 12 ? "PM" : "AM";
        const min = date.getMinutes();
        const month = date.toLocaleString("en-US", { month: "short" });

        return month + " " + day + ", " + year + " • " + hour + ":" + min + " " + meridien;
    }

    return (
        <Box style={styles.transactionItemWrapper}>
            <HStack>
                <FontAwesomeIcon
                    icon={wallet == transactions.walletIn ? faCircleArrowDownLeftCustom : faCircleArrowUpRightCustom}
                    style={wallet == transactions.walletIn ? styles.receiveIcon : styles.sendIcon}
                    size={30}
                />
                <VStack style={styles.verticalStack}>
                    <HStack>
                        <Text style={styles.transactionsAddress}>
                            {formatTransactionAddress(transactions.transactionAddress)}
                        </Text>
                        <Text style={styles.transactionAmount}>{transactions.amount}</Text>
                    </HStack>
                    <HStack>
                        <Text style={styles.transactionDate}>{getFromattedDate(transactions.createdAt)}</Text>
                        <Text style={styles.transactionCurrency}>{getCurrencyType()}</Text>
                    </HStack>
                </VStack>
            </HStack>
        </Box>
    );
}

const styles = StyleSheet.create({
    sendIcon: {
        color: "#404040",
        marginLeft: 0,
        marginRight: 10,
        alignSelf: "center",
    },
    receiveIcon: {
        color: "#16A34A",
        marginLeft: 0,
        marginRight: 10,
        alignSelf: "center",
    },
    verticalStack: {
        flex: 1,
    },
    transactionsAddress: {
        paddingRight: "5px",
        fontSize: 17,
        fontWeight: "600",
    },
    transactionAmount: {
        marginLeft: "auto",
        fontSize: 17,
        color: "#16A34A",
        fontWeight: "600",
    },
    transactionDate: {
        fontSize: 15,
        color: "#737373",
    },
    transactionCurrency: {
        fontSize: 15,
        color: "#737373",
        marginLeft: "auto",
    },
    transactionItemWrapper: {
        paddingVertical: 12,
    },
});
