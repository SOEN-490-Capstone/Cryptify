import React from "react";
import { Text, HStack, Box, VStack, Pressable } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { falCircleArrowDownLeft } from "../icons/light/falCircleArrowDownLeft";
import { falCircleArrowUpRight } from "../icons/light/falCircleArrowUpRight";
import { CompositeNavigationProp } from "@react-navigation/native";
import { getFormattedAmount, getCurrencyType, typeToISOCode } from "@cryptify/common/src/utils/currency_utils";
import { formatAddress } from "@cryptify/common/src/utils/address_utils";

type Props = {
    transaction: Transaction;
    walletAddress: string;
    navigation: CompositeNavigationProp<any, any>;
};

export function TransactionListItem({ transaction, walletAddress, navigation }: Props) {
    const isIncomingTransaction = walletAddress == transaction.walletIn;

    function getFormattedDate(timestamp: string): string {
        const date = new Date(timestamp);
        const datePart = date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const timePart = date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit" });
        return `${datePart} • ${timePart}`;
    }

    return (
        <Pressable
            testID={"transactionsListItem"}
            onPress={() =>
                navigation.navigate("TransactionDetailsScreen", {
                    title: getFormattedDate(transaction.createdAt as any),
                    transaction: transaction,
                    walletAddress: walletAddress,
                })
            }
        >
            <Box style={styles.transactionItemWrapper}>
                <HStack>
                    <FontAwesomeIcon
                        icon={isIncomingTransaction ? falCircleArrowDownLeft : falCircleArrowUpRight}
                        style={isIncomingTransaction ? styles.receiveIcon : styles.sendIcon}
                        size={30}
                    />
                    <VStack style={styles.verticalStack}>
                        <HStack>
                            <Text fontWeight={"semibold"} style={styles.transactionsAddress}>
                                {formatAddress(transaction.transactionAddress)}
                            </Text>
                            <Text
                                isTruncated
                                fontWeight={"semibold"}
                                color={isIncomingTransaction ? "success.600" : undefined}
                                style={styles.transactionAmountInOut}
                            >
                                {isIncomingTransaction ? "+" : "-"}
                                {getFormattedAmount(
                                    transaction.amount,
                                    getCurrencyType(transaction.transactionAddress),
                                )}
                            </Text>
                        </HStack>
                        <HStack>
                            <Text size={"subheadline"} color="text.500">
                                {getFormattedDate(transaction.createdAt as any)}
                            </Text>
                            <Text size={"subheadline"} color="text.500" style={styles.transactionCurrency}>
                                {typeToISOCode[getCurrencyType(transaction.transactionAddress)]}
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
    },
    transactionAmountInOut: {
        marginLeft: "auto",
    },
    transactionCurrency: {
        marginLeft: "auto",
    },
    transactionItemWrapper: {
        paddingVertical: 12,
    },
});
