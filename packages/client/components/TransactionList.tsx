import React from "react";
import { Text, HStack, Box, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet } from "react-native";
import { Transaction as TransactionEntity } from "@cryptify/common/src/domain/entities/transaction";
import { faCircleArrowDownLeftCustom } from "./icons/faCircleArrowDownLeftCustom";
import { faCircleArrowUpRightCustom } from "./icons/faCircleArrowUpRightCustom";
import { Transaction } from "./Transaction";
import { groupBy } from "lodash";

type Props = {
    transactions: TransactionEntity[];
    walletAddress: string;
    displaySeparation: boolean; 
};

export function TransactionList({ transactions, walletAddress, displaySeparation }: Props) {
    var savedDate = new Date();
    function renderSeparation(date: Date) {
        if(savedDate?.getFullYear() == date.getFullYear() && savedDate.getMonth() == date.getMonth()){
            savedDate = date;
            return;
        }
        savedDate = date;
        return(
        <Box backgroundColor="text.100">
            <Text color="text.500" style={styles.dateSeparator}>
                {date.toLocaleString('en-US', {month: 'long'})+" "+date.getFullYear()}
            </Text>
        </Box>
        ) 
    }

    function renderTransactions(transactions: TransactionEntity[]){
        return(
            <Box backgroundColor="white" style={styles.transactionWrapper}>
                {transactions.map((transaction)=><Transaction transaction={transaction} walletAddress={walletAddress}/>)}
            </Box>
        )
    }

    if(displaySeparation){
        return(
            <>
            {transactions.map((transaction)=>
            (
            <>
                {renderSeparation(transaction.createdAt)}                
                <Box backgroundColor="white" style={styles.transactionWrapper}>
                    <Transaction transaction={transaction} walletAddress={walletAddress}/>
                </Box>
            </>
            )      
            )}
            </>
        )
    }
    return (
       <>
        {renderTransactions(transactions)}
       </>
    );
}

const styles = StyleSheet.create({
    dateSeparator: {
        fontSize: 17,
        fontWeight: "600",
        marginLeft: 15,
    },
    transactionWrapper:{
        paddingLeft: 15,
    },
 });
