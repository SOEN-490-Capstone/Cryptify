import React from "react";
import { View } from "../components/Themed";
import { Pressable, HStack, Text, ScrollView, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AuthContext } from "../components/contexts/AuthContext";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { TagsGateway } from "../gateways/tags_gateway";
import { HomeStackScreenProps } from "../types";
import { farPlus } from "../components/icons/regular/farPlus";
import { farXMark } from "../components/icons/regular/farXMark";
import SortService from "../services/sort_service";

export default function TransactionTagsScreen(props: HomeStackScreenProps<"TransactionTagsScreen">) {
    const tagsGateway = new TagsGateway();

    const transaction = props.route.params.transaction;
    const { token, user } = React.useContext(AuthContext);

    const [transactionTags, setTransactionTags] = React.useState<TransactionTag[]>([
        ...props.route.params.transaction.tags,
    ]);
    const [transactionTagsNotAdded, setTransactionTagsNotAdded] = React.useState<TransactionTag[]>([]);

    React.useEffect(() => {
        (async () => {
            const tags = await tagsGateway.findAllTags({ id: user.id }, token);

            const transactionTagsNotAdded = tags.filter(
                (tag) => !transactionTags.some((t) => t.tagName === tag.tagName),
            );
            setTransactionTagsNotAdded(transactionTagsNotAdded);
        })();
    }, []);

    function removeTransactionTag(tag: TransactionTag) {
        updateTransactionTag(tag, false).then((updatedTag) => {
            const updatedTransactionTags = transactionTags.filter((t) => t.tagName !== updatedTag.tagName);

            props.route.params.setTransaction({
                ...transaction,
                tags: updatedTransactionTags,
            });

            setTransactionTags(updatedTransactionTags);
            setTransactionTagsNotAdded([...transactionTagsNotAdded, updatedTag]);
        });
    }

    function addTransactionTag(tag: TransactionTag) {
        updateTransactionTag(tag, true).then((updatedTag) => {
            props.route.params.setTransaction({
                ...transaction,
                tags: [...transaction.tags, updatedTag],
            });

            setTransactionTags([...transactionTags, updatedTag]);
            setTransactionTagsNotAdded(transactionTagsNotAdded.filter((t) => t.tagName !== updatedTag.tagName));
        });
    }

    async function updateTransactionTag(tag: TransactionTag, isAddTag: boolean): Promise<TransactionTag> {
        return await tagsGateway.updateTag(
            {
                userId: user.id,
                currentName: tag.tagName,
                newName: undefined,
                addTransactions: isAddTag ? [transaction.id] : undefined,
                removeTransactions: !isAddTag ? [transaction.id] : undefined,
            },
            token,
        );
    }

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                <VStack space={"20px"}>
                    <Text fontWeight={"semibold"} size={"title3"}>
                        Tags for This Transaction
                    </Text>
                    <HStack flexWrap={"wrap"} style={styles.tagsAdded}>
                        {transactionTags.length != 0 && (
                            <>
                                {SortService.sortTransactionTagsAlphabetically(transactionTags).map((tag, i) => (
                                    // TODO create a component and use it for both tags list
                                    <Pressable
                                        onPress={() => removeTransactionTag(tag)}
                                        rounded="md"
                                        backgroundColor="gray.100"
                                        style={styles.badge}
                                        key={i}
                                    >
                                        <HStack space={"10px"} style={styles.badgeContent}>
                                            <Text size={"subheadline"} fontWeight={"semibold"}>
                                                {tag.tagName}
                                            </Text>
                                            <FontAwesomeIcon icon={farXMark} size={14} color="#404040" />
                                        </HStack>
                                    </Pressable>
                                ))}
                            </>
                        )}
                        {transactionTags.length < 10 && (
                            <>
                                <Pressable
                                    onPress={() =>
                                        props.navigation.navigate("AddTransactionTagsScreen", {
                                            transaction: transaction,
                                            setTransaction: props.route.params.setTransaction,
                                            transactionTags: transactionTags,
                                            setTransactionTags: setTransactionTags,
                                            transactionTagsNotAdded: transactionTagsNotAdded,
                                            setTransactionTagsNotAdded: setTransactionTagsNotAdded,
                                        })
                                    }
                                    rounded="md"
                                    backgroundColor="darkBlue.50"
                                    borderColor={"darkBlue.500"}
                                    style={styles.addBadge}
                                    borderWidth={"2px"}
                                    borderStyle={"dashed"}
                                    testID="addNewTagButton"
                                >
                                    <HStack space={"10px"} style={styles.badgeContent}>
                                        <Text size={"subheadline"} fontWeight={"semibold"} color={"darkBlue.500"}>
                                            Add
                                        </Text>
                                        <FontAwesomeIcon icon={farPlus} size={14} color="#0077E6" />
                                    </HStack>
                                </Pressable>
                            </>
                        )}
                    </HStack>
                </VStack>
                {transactionTagsNotAdded.length != 0 && (
                    <>
                        <VStack space={"20px"} style={styles.allTags}>
                            <Text fontWeight={"semibold"} size={"title3"}>
                                All Tags
                            </Text>
                            <HStack flexWrap={"wrap"}>
                                {SortService.sortTransactionTagsAlphabetically(transactionTagsNotAdded).map(
                                    (tag, i) => (
                                        // TODO create a component and use it for both tags list
                                        <Pressable
                                            onPress={() => {
                                                if (transactionTags.length < 10) {
                                                    addTransactionTag(tag);
                                                }
                                            }}
                                            rounded="md"
                                            backgroundColor="gray.100"
                                            style={styles.badge}
                                            key={i}
                                            testID="tag"
                                        >
                                            <HStack space={"10px"} style={styles.badgeContent}>
                                                <Text size={"subheadline"} fontWeight={"semibold"}>
                                                    {tag.tagName}
                                                </Text>
                                                {transactionTags.length < 10 && (
                                                    <FontAwesomeIcon icon={farPlus} size={14} color="#404040" />
                                                )}
                                            </HStack>
                                        </Pressable>
                                    ),
                                )}
                            </HStack>
                        </VStack>
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    badge: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 13,
        marginBottom: 13,
        justifyContent: "center",
    },
    addBadge: {
        marginBottom: 13,
        height: 36,
        width: 85,
        alignItems: "center",
        justifyContent: "center",
    },
    badgeContent: {
        alignItems: "center",
    },
    allTags: {
        marginTop: 40,
        paddingBottom: 15,
    },
    tagsAdded: {
        marginBottom: -13,
    },
});
