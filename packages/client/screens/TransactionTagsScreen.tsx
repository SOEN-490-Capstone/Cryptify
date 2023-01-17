import React from "react";
import { View } from "../components/Themed";
import { Pressable, HStack, Text, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AuthContext } from "../components/contexts/AuthContext";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { TagsGateway } from "../gateways/tags_gateway";
import { HomeStackScreenProps } from "../types";
import { farPlus } from "../components/icons/regular/farPlus";
import { farXMark } from "../components/icons/regular/farXMark";
import SortService from "../services/sort_service";
import TagsGallery from "../components/TagsGallery";

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
                <TagsGallery
                    title={"Tags for This Transaction"}
                    tags={SortService.sortTransactionTagsAlphabetically(transactionTags)}
                    onTagPress={(tag) => removeTransactionTag(tag)}
                    tagIcon={farXMark}
                    styles={styles.tagsAdded}
                >
                    {transactionTags.length < 10 && (
                        <>
                            {/* TODO make/use a badge component */}
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
                                borderRadius={"8px"}
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
                </TagsGallery>
                {transactionTagsNotAdded.length != 0 && (
                    <TagsGallery
                        title={"All Tags"}
                        tags={SortService.sortTransactionTagsAlphabetically(transactionTagsNotAdded)}
                        onTagPress={(tag: TransactionTag) => {
                            if (transactionTags.length < 10) addTransactionTag(tag);
                        }}
                        tagIcon={transactionTags.length < 10 ? farPlus : undefined}
                        styles={styles.allTags}
                    />
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
