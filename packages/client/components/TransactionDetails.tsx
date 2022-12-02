import React from "react";
import { Text, HStack, Box, VStack, Badge } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { falCircleArrowDownLeft } from "./icons/light/falCircleArrowDownLeft";
import { falCircleArrowUpRight } from "./icons/light/falCircleArrowUpRight";
import { farCopy } from "./icons/regular/farCopy";
import * as Clipboard from "expo-clipboard";
import { getFormattedAmount } from "../services/currency_service";
import { formatAddress } from "../services/address_service";
import {getCurrencyType, typeToISOCode} from "@cryptify/common/src/utils/currency_utils";

type Props = {
    transaction: Transaction;
    walletAddress: string;
};

export function TransactionDetails({ transaction, walletAddress }: Props) {
    const isIncomingTransaction = walletAddress == transaction.walletIn;

    const copyToClipboard = async (valueToCopy: string) => {
        await Clipboard.setStringAsync(valueToCopy);
    };

    const renderHeader = (
        <Box style={styles.itemWrapper} testID="transactionDetailsHeader">
            <VStack>
                <FontAwesomeIcon
                    icon={isIncomingTransaction ? falCircleArrowDownLeft : falCircleArrowUpRight}
                    style={isIncomingTransaction ? styles.receiveIcon : styles.sendIcon}
                    size={48}
                />
                <Text
                    size={"title2"}
                    fontWeight={"semibold"}
                    color={isIncomingTransaction ? "success.600" : undefined}
                    style={styles.transactionAmountInOut}
                >
                    {isIncomingTransaction ? "+" : "-"}
                    {`${getFormattedAmount(transaction.amount, getCurrencyType(transaction.transactionAddress))} ${
                        typeToISOCode[getCurrencyType(transaction.transactionAddress)]
                    }`}
                </Text>
                <Text fontWeight={"semibold"} color="text.500" style={styles.transactionsAddress}>
                    {formatAddress(transaction.transactionAddress)}
                </Text>
            </VStack>
        </Box>
    );
    const renderBasicInfo = (
        // TODO
        // dynamically get the wallet name if any
        <Box style={styles.itemWrapper} testID="transactionDetailsBasicInfo">
            <VStack>
                <Box>
                    <Text size={"subheadline"} color="text.500">
                        Transaction ID
                    </Text>
                    <HStack space="10px">
                        <Text style={styles.elementInformationText}>{transaction.transactionAddress}</Text>
                        <Pressable onPress={() => copyToClipboard(transaction.transactionAddress)}>
                            <FontAwesomeIcon icon={farCopy} style={styles.copyIcon} size={20} />
                        </Pressable>
                    </HStack>
                </Box>
                <Box style={styles.subItemWrapper}>
                    <HStack>
                        <Text style={styles.elementInformationText}>Status</Text>
                        <Badge colorScheme="success" style={styles.transactionStatus}>
                            <Text size={"subheadline"} fontWeight={"semibold"} color="success.600">
                                Confirmed
                            </Text>
                        </Badge>
                    </HStack>
                </Box>
                <Box style={styles.subItemWrapper}>
                    <Text size={"subheadline"} color="text.500">
                        From
                    </Text>
                    <HStack space="10px">
                        <Text style={styles.elementInformationText}>{transaction.walletIn}</Text>
                        {isIncomingTransaction ? (
                            <Pressable onPress={() => copyToClipboard(transaction.walletIn)}>
                                <FontAwesomeIcon icon={farCopy} style={styles.copyIcon} size={20} />
                            </Pressable>
                        ) : (
                            <></>
                        )}
                    </HStack>
                </Box>
                <Box style={styles.subItemWrapper}>
                    <Text size={"subheadline"} color="text.500">
                        To
                    </Text>
                    <HStack space="10px">
                        <Text style={styles.elementInformationText}>{transaction.walletOut}</Text>
                        {isIncomingTransaction ? (
                            <></>
                        ) : (
                            <Pressable onPress={() => copyToClipboard(transaction.walletOut)}>
                                <FontAwesomeIcon icon={farCopy} style={styles.copyIcon} size={20} />
                            </Pressable>
                        )}
                    </HStack>
                </Box>
            </VStack>
        </Box>
    );
    const renderOtherDetails = (
        // TODO
        // Add block number, position in block and nonce
        // Get Gas Limit
        // Get Gas Price
        <Box style={styles.itemWrapper} testID="transactionDetailsOtherDetails">
            <VStack>
                <Box>
                    <Text size={"title3"} fontWeight={"semibold"}>
                        Other Details
                    </Text>
                </Box>
                <Box style={styles.subItemWrapper}>
                    <HStack>
                        <Text style={styles.elementInformationText}>Block Number</Text>
                        <Text color="text.500" style={styles.gasLimit}>
                            15
                        </Text>
                    </HStack>
                </Box>
                <Box style={styles.subItemWrapper}>
                    <HStack>
                        <Text style={styles.elementInformationText}>Position in Block</Text>
                        <Text color="text.500" style={styles.gasLimit}>
                            19
                        </Text>
                    </HStack>
                </Box>
                <Box style={styles.subItemWrapper}>
                    <HStack>
                        <Text style={styles.elementInformationText}>Nonce</Text>
                        <Text color="text.500" style={styles.gasLimit}>
                            109,764
                        </Text>
                    </HStack>
                </Box>
                <Box style={styles.subItemWrapper}>
                    <HStack>
                        <Text style={styles.elementInformationText}>Gas Limit (Units)</Text>
                        <Text color="text.500" style={styles.gasLimit}>
                            100,000
                        </Text>
                    </HStack>
                </Box>
                <Box style={styles.subItemWrapper}>
                    <Text size={"subheadline"} color="text.500">
                        Gas Price
                    </Text>
                    <Text>0.0000000000012323 ETH</Text>
                </Box>
            </VStack>
        </Box>
    );

    return (
        <>
            {renderHeader}
            <Box>
                {renderBasicInfo}
                {renderOtherDetails}
            </Box>
        </>
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
        marginLeft: "auto",
    },
    transactionsAddress: {
        paddingRight: 5,
        fontSize: 18,
        textAlign: "center",
    },
    transactionAmountInOut: {
        textAlign: "center",
        marginBottom: 10,
    },
    elementInformationText: {
        flex: 1,
    },
    transactionStatus: {
        marginLeft: "auto",
    },
    gasLimit: {
        marginLeft: "auto",
    },
});
