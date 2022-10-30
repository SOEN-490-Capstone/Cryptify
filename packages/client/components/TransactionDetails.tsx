import React from "react";
import { Text, HStack, Box, VStack, Badge, Spacer, ScrollView, Button } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { faCircleArrowDownLeftCustom } from "./icons/faCircleArrowDownLeftCustom";
import { faCircleArrowUpRightCustom } from "./icons/faCircleArrowUpRightCustom";
import { faCopyCustom } from "./icons/faCopyCustom";
import * as Clipboard from 'expo-clipboard';

type Props = {
    transaction: Transaction;
    walletAddress: string;
};

export function TransactionDetails({ transaction, walletAddress }: Props) {
    const isIncommingTransaction = walletAddress == transaction.walletIn;

    const copyToClipboard = async (valueToCopy: string) => {
        await Clipboard.setStringAsync(valueToCopy);
      };

    function formatTransactionAddress(address: string): string {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
    }

    function getCurrencyType(): string {
        return transaction.transactionAddress.substring(0, 2) == "0x" ? "ETH" : "BTC";
    }

    function renderHeader(){
        return(
            <Box style={styles.itemWrapper}>
                <VStack>
                <FontAwesomeIcon
                    icon={isIncommingTransaction ? faCircleArrowDownLeftCustom : faCircleArrowUpRightCustom}
                    style={isIncommingTransaction ? styles.receiveIcon : styles.sendIcon}
                    size={48}
                />
                <Text
                    color={isIncommingTransaction ? "success.600" : "text.600"}
                    style={isIncommingTransaction ? styles.transactionAmountIn : styles.transactionAmountOut}
                >
                    {isIncommingTransaction ? "+" : "-"}
                    {transaction.amount+" "} {getCurrencyType()}
                </Text>
                <Text color="text.500" style={styles.transactionsAddress}>
                    {formatTransactionAddress(transaction.transactionAddress)}
                </Text>
                </VStack>
            </Box>
        )
    }
    function renderBasicInfo(){
        // TODO 
        // Add the copy button
        // dynamically get the wallet name if any
        return(
            <Box style={styles.itemWrapper}>
                <VStack>
                    <Box>
                        <Text color="text.500" style={styles.elementInformationTitle}>
                            Transaction ID
                        </Text>
                        <HStack space="10px">
                            <Text style={styles.elementInformationText}>
                                {transaction.transactionAddress}
                            </Text>
                            <Pressable onPress={() => copyToClipboard(transaction.transactionAddress)}>
                                <FontAwesomeIcon
                                    icon={faCopyCustom}
                                    style={styles.copyIcon}
                                    size={20}
                                />
                            </Pressable>     
                        </HStack>
                    </Box>
                    <Box style={styles.subItemWrapper}>
                        <HStack>
                            <Text style={styles.elementInformationText}>
                                Status
                            </Text>
                            <Badge colorScheme="success" style={styles.transactionStatus}>
                                <Text color="success.600">Confirmed</Text>
                            </Badge>
                        </HStack>
                    </Box>
                    <Box style={styles.subItemWrapper}>
                        <Text color="text.500" style={styles.elementInformationTitle}>
                            From
                        </Text>
                        <HStack space="10px">
                            <Text style={styles.elementInformationText}>
                                {transaction.walletIn}
                            </Text>
                            <Pressable onPress={() => copyToClipboard(transaction.walletIn)}>
                                <FontAwesomeIcon
                                    icon={faCopyCustom}
                                    style={styles.copyIcon}
                                    size={20}
                                />
                            </Pressable>     
                        </HStack>
                    </Box>
                    <Box style={styles.subItemWrapper}>
                        <Text color="text.500" style={styles.elementInformationTitle}>
                            To
                        </Text>
                        <HStack space="10px">
                            <Text style={styles.elementInformationText}>
                                {transaction.walletOut}
                            </Text>
                            <Pressable onPress={() => copyToClipboard(transaction.walletOut)}>
                                <FontAwesomeIcon
                                    icon={faCopyCustom}
                                    style={styles.copyIcon}
                                    size={20}
                                />
                            </Pressable>     
                        </HStack>

                    </Box>
                </VStack>
            </Box>
        )
    }
    function renderTransactionFee(){
        // TODO
        // Get Gas
        // Get Gas Limit
        return(
            <Box style={styles.itemWrapper}>
                <VStack>
                    <Box>
                        <Text style={styles.categoryTitle}>
                            Transaction Fee
                        </Text>
                    </Box>
                    <Box style={styles.subItemWrapper}>
                        <Text color="text.500" style={styles.elementInformationTitle}>
                            Gas Price
                        </Text>
                        <Text>
                            0.0000000000012323 ETH
                        </Text>
                    </Box>
                    <Box style={styles.subItemWrapper}>
                        <HStack>
                            <Text>
                                Gas Limit
                            </Text>
                            <Text color="text.500" style={styles.gasLimit}>
                                100 000
                            </Text>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
        )
    }
    function renderOtherDetails(){
        // TODO
        // Add block number, position in block and nonce
        return(
            <Box style={styles.itemWrapper}>
                <VStack>
                    <Box>
                        <Text style={styles.categoryTitle}>
                            Other Details
                        </Text>
                    </Box>
                    <Box style={styles.subItemWrapper}>
                        <HStack>
                            <Text>
                                Block Number
                            </Text>
                            <Text color="text.500" style={styles.gasLimit}>
                                15
                            </Text>
                        </HStack>
                    </Box>
                    <Box style={styles.subItemWrapper}>
                        <HStack>
                            <Text>
                                Position in Block
                            </Text>
                            <Text color="text.500" style={styles.gasLimit}>
                                19
                            </Text>
                        </HStack>
                    </Box>
                    <Box style={styles.subItemWrapper}>
                        <HStack>
                            <Text>
                                Nonce
                            </Text>
                            <Text color="text.500" style={styles.gasLimit}>
                                109,764
                            </Text>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
        )
    }
    
    return(
        <ScrollView style={{        paddingHorizontal: 20,        }}>
            {renderHeader()}
            <Box>
                {renderBasicInfo()}
                {renderTransactionFee()}
                {renderOtherDetails()}
            </Box>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    itemWrapper: {
        paddingTop: 40,
    },
    subItemWrapper: {
        paddingTop: 20,
    },
    sendIcon: {
        //text.700
        color: "#404040",
        alignSelf: "center",
        marginBottom: 15,
    },
    receiveIcon: {
        //success.600
        color: "#16A34A",
        alignSelf: "center",
        marginBottom: 15,
    },
    copyIcon: {
        //darkBlue.500
        color: "#0077E6",
        marginLeft: "auto"
    },
    transactionsAddress: {
        paddingRight: "5",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center"
    },
    transactionAmountOut: {
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 10,
    },
    transactionAmountIn: {
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 10,
    },
    elementInformationTitle: {
        fontSize: 15,
    },
    elementInformationText:{
        fontSize: 17,
        flex: 1
    },
    transactionStatus: {
        marginLeft: "auto",
    },
    transactionStatusText:{
        fontSize: 15,
        fontWeight: "600",
    },
    gasLimit: {
        marginLeft: "auto",
        fontSize: 17,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: "600",
    }
});
