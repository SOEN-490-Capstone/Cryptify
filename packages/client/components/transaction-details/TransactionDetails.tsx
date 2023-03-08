import React from "react";
import { Text, HStack, Box, VStack, Badge } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, StyleSheet } from "react-native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { falCircleArrowDownLeft } from "../icons/light/falCircleArrowDownLeft";
import { falCircleArrowUpRight } from "../icons/light/falCircleArrowUpRight";
import { getFormattedAmount, getCurrencyType, typeToISOCode } from "@cryptify/common/src/utils/currency_utils";
import { CompositeNavigationProp, useIsFocused } from "@react-navigation/native";
import { farChevronRight } from "../icons/regular/farChevronRight";
import SortService from "../../services/sort_service";
import { AuthContext } from "../contexts/AuthContext";
import { TransactionsGateway } from "../../gateways/transactions_gateway";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { formatAddress } from "@cryptify/common/src/utils/address_utils";
import MultiLineListItem from "../list/MultiLineListItem";
import SingleLineListItem from "../list/SingleLineListItem";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import TransactionDetailsActionSheet from "./TransactionDetailsActionSheet";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

type Props = {
    txn: Transaction;
    wallet: WalletWithBalance;
    navigation: CompositeNavigationProp<any, any>;
    otherDetails?: React.ReactNode;
};

type TagRenderInfo = {
    tagName: string;
    width: number;
    index: number;
};

export function TransactionDetails({ txn, wallet, navigation, otherDetails }: Props) {
    const transactionGateway = new TransactionsGateway();
    const isFocused = useIsFocused();

    const { token, user } = React.useContext(AuthContext);

    const [transaction, setTransaction] = React.useState<Transaction>(txn);
    const [transactionTags, setTransactionTags] = React.useState<Tag[]>([]);
    const isIncomingTransaction = wallet.address == transaction.walletIn;
    const transactionFee = +(transaction.gasLimit || 0) * +(transaction.gasPrice || 0);

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

    React.useEffect(() => {
        (() => {
            if (!txn.contactIn && !txn.contactOut) {
                navigation.setOptions({
                    headerRight: () => (
                        <TransactionDetailsActionSheet
                            wallet={wallet}
                            navigation={navigation}
                            transaction={transaction}
                        />
                    ),
                });
            }
        })();
    });

    const renderHeader = (
        <VStack space={"15px"} alignItems={"center"} testID="transactionDetailsHeader">
            <FontAwesomeIcon
                icon={isIncomingTransaction ? falCircleArrowDownLeft : falCircleArrowUpRight}
                style={isIncomingTransaction ? styles.receiveIcon : styles.sendIcon}
                size={48}
            />
            <VStack space={"10px"} alignItems={"center"}>
                <Text size={"title2"} fontWeight={"semibold"} color={isIncomingTransaction ? "success.600" : undefined}>
                    {isIncomingTransaction ? "+" : "-"}
                    {`${getFormattedAmount(transaction.amount, getCurrencyType(transaction.transactionAddress))} ${
                        typeToISOCode[getCurrencyType(transaction.transactionAddress)]
                    }`}
                </Text>
                <Text fontWeight={"semibold"} color="text.500" fontSize={"18px"}>
                    {formatAddress(transaction.transactionAddress)}
                </Text>
            </VStack>
        </VStack>
    );

    const renderTags = (
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
                <HStack height={"47px"} alignItems="center">
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
                                                borderRadius={"8px"}
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
                                            borderRadius={"8px"}
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
    );

    const renderBasicInfo = (
        <VStack space={"20px"} testID="transactionDetailsBasicInfo">
            <MultiLineListItem
                label={"Transaction ID"}
                value={transaction.transactionAddress}
                copy={true}
                labelCopy={"Transaction ID"}
            />
            <SingleLineListItem
                label={"Status"}
                value={
                    <Badge
                        backgroundColor="success.100"
                        borderRadius={"5px"}
                        px={"10px"}
                        py={"4px"}
                        _text={{ fontSize: "subheadline", fontWeight: "semibold", color: "success.600" }}
                    >
                        Confirmed
                    </Badge>
                }
            />
            <MultiLineListItem
                label={"Fee"}
                value={`${getFormattedAmount(transactionFee.toString(), wallet.currencyType)} ${
                    typeToISOCode[wallet.currencyType]
                }`}
            />
            <MultiLineListItem
                label={"From"}
                value={isIncomingTransaction ? transaction.walletOut : wallet.name}
                altValue={transaction.contactOut?.contactName}
                copy={isIncomingTransaction}
                labelCopy={"Address"}
            />
            <MultiLineListItem
                label={"To"}
                value={isIncomingTransaction ? wallet.name : transaction.walletIn}
                altValue={transaction.contactIn?.contactName}
                copy={!isIncomingTransaction}
                labelCopy={"Address"}
            />
            {renderTags}
        </VStack>
    );
    const renderOtherDetails = (
        <VStack space={"20px"} testID="transactionDetailsOtherDetails">
            <Text size={"title3"} fontWeight={"semibold"}>
                Other Details
            </Text>
            {otherDetails}
        </VStack>
    );

    return (
        <>
            <VStack space={"40px"} style={styles.transactionDetails}>
                {renderHeader}
                {renderBasicInfo}
                {!!otherDetails && renderOtherDetails}
            </VStack>
        </>
    );
}

const styles = StyleSheet.create({
    transactionDetails: {
        marginTop: 40,
        paddingBottom: 15,
    },
    sendIcon: {
        color: "#404040", //text.700
    },
    receiveIcon: {
        color: "#16A34A", //success.600
    },
    transactionStatus: {
        marginLeft: "auto",
    },
    moreTagsCount: {
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    badge: {
        marginRight: 10,
        marginBottom: 10,
        justifyContent: "center",
    },
    chevronRightIcon: {
        color: "#A3A3A3", // text.400
        marginLeft: "auto",
        marginBottom: "auto",
        marginTop: "auto",
    },
});
