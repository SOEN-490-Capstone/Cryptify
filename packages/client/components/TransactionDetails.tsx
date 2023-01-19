import React from "react";
import { Text, HStack, Box, VStack, Badge } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { falCircleArrowDownLeft } from "./icons/light/falCircleArrowDownLeft";
import { falCircleArrowUpRight } from "./icons/light/falCircleArrowUpRight";
import { farCopy } from "./icons/regular/farCopy";
import * as Clipboard from "expo-clipboard";
import { getFormattedAmount } from "@cryptify/common/src/utils/currency_utils";
import { CompositeNavigationProp, useIsFocused } from "@react-navigation/native";
import { farChevronRight } from "./icons/regular/farChevronRight";
import SortService from "../services/sort_service";
import { AuthContext } from "./contexts/AuthContext";
import { TransactionsGateway } from "../gateways/transactions_gateway";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { formatAddress } from "@cryptify/common/src/utils/address_utils";
import { getCurrencyType, typeToISOCode } from "@cryptify/common/src/utils/currency_utils";
import {WalletWithBalance} from "@cryptify/common/src/domain/wallet_with_balance";

type Props = {
    txn: Transaction;
    wallet: WalletWithBalance;
    navigation: CompositeNavigationProp<any, any>;
};

type TagRenderInfo = {
    tagName: string;
    width: number;
    index: number;
};

export function TransactionDetails({ txn, wallet, navigation }: Props) {
    const transactionGateway = new TransactionsGateway();
    const isFocused = useIsFocused();

    const { token, user } = React.useContext(AuthContext);

    const [transaction, setTransaction] = React.useState<Transaction>(txn);
    const [transactionTags, setTransactionTags] = React.useState<TransactionTag[]>([]);
    const isIncomingTransaction = wallet.address == transaction.walletIn;
    const currencyTypeCheck = getCurrencyType(transaction.transactionAddress) == "BITCOIN";

    const [tagRenderState, setTagRenderState] = React.useState<boolean[]>([]);
    const [tagsContainerWidth, setTagsContainerWidth] = React.useState<number>(0);
    const [tagRenderInfo, setTagRenderInfo] = React.useState<TagRenderInfo[]>([]);
    const [dummyTagsContainerRender, setDummyTagsContainerRender] = React.useState<boolean>(true);
    const [moreTagsCount, setMoreTagsCount] = React.useState<number>(0);
    const [updateTagsContainerWidth, setUpdateTagsContainerWidth] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (isFocused) {
            (async () => {
                const transactions = await transactionGateway.findAllTransactions({ id: user.id }, token);
                const txn = transactions.filter((t) => t.id === transaction.id)[0];
                setTransaction(txn);

                setDummyTagsContainerRender(true);
                setTagRenderInfo([]);
                setTransactionTags([]);
                setTagRenderState([]);
                setUpdateTagsContainerWidth(false);

                setTransactionTags(txn.tags);
            })();
        }
    }, [isFocused]);

    React.useLayoutEffect(() => {
        if (
            transactionTags.length > 0 &&
            tagRenderInfo.length === transactionTags.length &&
            tagsContainerWidth > 0 &&
            !updateTagsContainerWidth
        ) {
            setDummyTagsContainerRender(false);

            let moreTagsCount = 0;
            const tagRenderStates: boolean[] = [];

            const tagsSortedAlphabetically = tagRenderInfo.sort((a, b) => (a.tagName > b.tagName ? 1 : -1));

            // Always show the first tag
            tagRenderStates.push(true);
            let totalWidth = tagsSortedAlphabetically[0].width + 10;

            for (let i = 1; i < tagsSortedAlphabetically.length; i++) {
                const lastElement = tagRenderStates[tagRenderStates.length - 1];

                if (lastElement && totalWidth + tagsSortedAlphabetically[i].width + 10 <= tagsContainerWidth - 60) {
                    totalWidth += tagsSortedAlphabetically[i].width + 10;

                    tagRenderStates.push(true);
                } else {
                    moreTagsCount += 1;
                    tagRenderStates.push(false);
                }
            }

            setTagRenderState(tagRenderStates);
            setMoreTagsCount(moreTagsCount);
            setUpdateTagsContainerWidth(true);
        }
    }, [tagRenderInfo, tagsContainerWidth]);

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

    const renderTags = (
        <Box style={styles.subItemWrapper}>
            <Pressable
                onPress={() =>
                    navigation.navigate("TransactionTagsScreen", {
                        transaction: transaction,
                        setTransaction: setTransaction,
                    })
                }
                testID="addTagsButton"
            >
                {transactionTags.length === 0 ? (
                    <HStack style={styles.addTagsButton} alignItems="center">
                        <Text color={"text.500"}>Add Tags</Text>
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                ) : (
                    <HStack
                        onLayout={(e) => {
                            setTagsContainerWidth(e.nativeEvent.layout.width);
                        }}
                    >
                        <VStack space={"6px"} style={{ width: "100%", overflow: "hidden" }}>
                            <Text size={"subheadline"} color="text.500">
                                Tags
                            </Text>
                            <HStack>
                                <HStack
                                    style={
                                        updateTagsContainerWidth
                                            ? {
                                                  maxWidth: tagsContainerWidth - 60,
                                              }
                                            : { width: tagsContainerWidth - 60 }
                                    }
                                >
                                    {SortService.sortTransactionTagsAlphabetically(transactionTags).map((tag, i) => (
                                        <VStack key={i}>
                                            {/* Dummy badges solely used to calculate dimensions when rendered on the UI
                                                and immediately hidden from the UI once all badges have been measured. */}
                                            <Box style={dummyTagsContainerRender ? {} : { display: "none" }}>
                                                <Badge
                                                    rounded="md"
                                                    backgroundColor="gray.100"
                                                    onLayout={(e) => {
                                                        setTagRenderInfo([
                                                            ...tagRenderInfo,
                                                            {
                                                                tagName: tag.tagName,
                                                                width: e.nativeEvent.layout.width,
                                                                index: i,
                                                            },
                                                        ]);
                                                    }}
                                                    style={styles.badge}
                                                    px={"10px"}
                                                    py={"5px"}
                                                    key={tag.tagName}
                                                >
                                                    <Text size={"subheadline"} fontWeight={"semibold"} isTruncated>
                                                        {tag.tagName}
                                                    </Text>
                                                </Badge>
                                            </Box>
                                            {/* Actual badges to be rendered on the UI. */}
                                            <Badge
                                                rounded="md"
                                                backgroundColor="gray.100"
                                                px={"10px"}
                                                py={"5px"}
                                                key={i}
                                                style={[styles.badge, tagRenderState[i] ? {} : { display: "none" }]}
                                            >
                                                <Text size={"subheadline"} fontWeight={"semibold"} isTruncated>
                                                    {tag.tagName}
                                                </Text>
                                            </Badge>
                                        </VStack>
                                    ))}
                                </HStack>
                                {moreTagsCount > 0 && (
                                    <Box style={styles.moreTagsCount}>
                                        <Text>+{moreTagsCount}</Text>
                                    </Box>
                                )}
                            </HStack>
                        </VStack>
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                )}
            </Pressable>
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
                <Box style={currencyTypeCheck ? styles.subItemWrapper : { display: "none" }}>
                    <Text size={"subheadline"} color="text.500">
                        Fee
                    </Text>
                    <Text>0.00002272 BTC</Text>
                </Box>
                <Box style={styles.subItemWrapper}>
                    <Text size={"subheadline"} color="text.500">
                        From
                    </Text>
                    {transaction.contactOut && <Text style={styles.elementInformationText}>{transaction.contactOut.contactName}</Text>}
                    <HStack space="10px">
                        <Text style={styles.elementInformationText}>{isIncomingTransaction ? transaction.walletOut : wallet.name}</Text>
                        {isIncomingTransaction && (
                            <Pressable onPress={() => copyToClipboard(transaction.walletOut)}>
                                <FontAwesomeIcon icon={farCopy} style={styles.copyIcon} size={20} />
                            </Pressable>
                        )}
                    </HStack>
                </Box>
                <Box style={styles.subItemWrapper}>
                    <Text size={"subheadline"} color="text.500">
                        To
                    </Text>
                    {transaction.contactIn && <Text style={styles.elementInformationText}>{transaction.contactIn.contactName}</Text>}
                    <HStack space="10px">
                        <Text style={styles.elementInformationText}>{!isIncomingTransaction ? transaction.walletIn : wallet.name}</Text>
                        {!isIncomingTransaction && (
                            <Pressable onPress={() => copyToClipboard(transaction.walletIn)}>
                                <FontAwesomeIcon icon={farCopy} style={styles.copyIcon} size={20} />
                            </Pressable>
                        )}
                    </HStack>
                </Box>
                {renderTags}
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
                <Box style={currencyTypeCheck ? { display: "none" } : styles.subItemWrapper}>
                    <HStack>
                        <Text style={styles.elementInformationText}>Position in Block</Text>
                        <Text color="text.500" style={styles.gasLimit}>
                            19
                        </Text>
                    </HStack>
                </Box>
                <Box style={currencyTypeCheck ? { display: "none" } : styles.subItemWrapper}>
                    <HStack>
                        <Text style={styles.elementInformationText}>Nonce</Text>
                        <Text color="text.500" style={styles.gasLimit}>
                            109,764
                        </Text>
                    </HStack>
                </Box>
                <Box style={currencyTypeCheck ? { display: "none" } : styles.subItemWrapper}>
                    <HStack>
                        <Text style={styles.elementInformationText}>Gas Limit (Units)</Text>
                        <Text color="text.500" style={styles.gasLimit}>
                            100,000
                        </Text>
                    </HStack>
                </Box>
                <Box style={currencyTypeCheck ? styles.subItemWrapper : { display: "none" }}>
                    <HStack>
                        <Text style={styles.elementInformationText}>Confirmations</Text>
                        <Text color="text.500" style={styles.gasLimit}>
                            35
                        </Text>
                    </HStack>
                </Box>
                <Box style={currencyTypeCheck ? { display: "none" } : styles.subItemWrapper}>
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
            <Box style={styles.transactionDetails}>
                {renderBasicInfo}
                {renderOtherDetails}
            </Box>
        </>
    );
}

const styles = StyleSheet.create({
    transactionDetails: {
        paddingBottom: 15,
    },
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
    tags: {
        marginBottom: -10,
    },
    moreTagsCount: {
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    addTagsButton: {
        height: 47,
        alignItems: "center",
    },
    badge: {
        marginRight: 10,
        marginBottom: 10,
        justifyContent: "center",
    },
    chevronRightIcon: {
        // text.400
        color: "#A3A3A3",
        marginLeft: "auto",
        marginBottom: "auto",
        marginTop: "auto",
    },
});
