import React from "react";
import { Text, HStack, Box, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";
import { Transaction as TransactionEntity } from "@cryptify/common/src/domain/entities/transaction";
import { faCircleArrowDownLeftCustom } from "./icons/faCircleArrowDownLeftCustom";
import { faCircleArrowUpRightCustom } from "./icons/faCircleArrowUpRightCustom";
import { Transaction } from "./Transaction";

type Props = {
    transactions: TransactionEntity[];
    walletAddress: string;
};

export function TransactionList({ transactions, walletAddress }: Props) {

    return (
       <>
       {/* {transactions.map((transaction)=><Transaction transaction={transaction} walletAddress={walletAddress}/>)} */}
       </>
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
        paddingRight: "5",
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
