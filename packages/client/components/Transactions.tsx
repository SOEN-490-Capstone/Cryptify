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
    transactions = {
        "transactionAddress": "0x085321ee6b98b639bca20d00ac07fada7cabb7662ca7f031dc15e64a8db05980",
        "walletIn": "0xddfabcdc4d8ffc6d5beaf154f18b778f892a0740",
        "walletOut": "0x4827f065ee8d939e92d941fb1e48106b4ecd0ea4",
        "amount": "0.00815709",
        "createdAt": new Date("2021-11-08T14:10:05.000Z")
    };
    wallet = "0xddfabcdc4d8ffc6d5beaf154f18b778f892a0740";

    function formatTransactionAddress(address: string): string {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
    }

    function getCurrencyType(): string{
        return transactions.transactionAddress.substring(0,2) == "0x" ? "ETH" : "BTC";
    }

    function getFromattedDate(date: Date): String{
        const day = date.getDay();
        const year = date.getFullYear();
        const hour = date.getHours() % 12;
        const meridien = date.getHours() > 12 ? "PM" : "AM";
        const min = date.getMinutes();
        var month = "";
        switch(date.getMonth()){
            case 1:{
                month="Jan";
                break;
            }       
            case 2:{
                month="Feb";
                break;
            }  
            case 3:{
                month="Mar";
                break;
            }       
            case 4:{
                month="Apr";
                break;
            }  
            case 5:{
                month="May";
                break;
            }       
            case 6:{
                month="Jun";
                break;
            }  
            case 7:{
                month="Jul";
                break;
            }       
            case 8:{
                month="Aug";
                break;
            } 
            case 9:{
                month="Sep";
                break;
            }       
            case 10:{
                month="Oct";
                break;
            }  
            case 11:{
                month="Nov";
                break;
            }       
            case 12:{
                month="Dec";
                break;
            } 
        }
        return "";
    }

    return (
        <Box style={styles.transactionItemWrapper}>
        <HStack>
            <FontAwesomeIcon
                    icon={wallet == transactions.walletIn ? faCircleArrowDownLeftCustom : faCircleArrowUpRightCustom}
                    style={wallet == transactions.walletIn ? styles.receiveIcon: styles.sendIcon}
                    size={30}        
            />
            <VStack style={styles.verticalStack}>
                <HStack>
                        <Text style={styles.transactionsAddress}>
                            {formatTransactionAddress(transactions.transactionAddress)}
                        </Text>
                        <Text style = {styles.transactionAmount}>
                            {transactions.amount}
                        </Text>
                </HStack>
                <HStack>
                    <Text style={styles.transactionDate} >
                        {transactions.createdAt.toUTCString()}
                    </Text>
                    <Text style = {styles.transactionCurrency}>
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
        color: "#404040",
        marginLeft: 0,
        marginRight: 10,
        alignSelf: 'center'
    },
    receiveIcon: {
        color: "#16A34A",
        marginLeft: 0,
        marginRight: 10,
        alignSelf: 'center'
    },
    verticalStack: {
        flex: 1
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
        marginLeft: "auto"
    },
    transactionItemWrapper: {
        paddingVertical: 12,
    },
});
