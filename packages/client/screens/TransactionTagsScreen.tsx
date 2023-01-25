import React from "react";
import { View } from "../components/Themed";
import { ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { AuthContext } from "../components/contexts/AuthContext";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { TagsGateway } from "../gateways/tags_gateway";
import { HomeStackScreenProps } from "../types";
import { farPlus } from "../components/icons/regular/farPlus";
import { farXMark } from "../components/icons/regular/farXMark";
import SortService from "../services/sort_service";
import TagsGallery from "../components/tags/TagsGallery";
import AddTag from "../components/tags/AddTag";

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
                        <AddTag
                            onPress={() => {
                                props.navigation.navigate("AddTransactionTagsScreen", {
                                    transaction: transaction,
                                    setTransaction: props.route.params.setTransaction,
                                    transactionTags: transactionTags,
                                    setTransactionTags: setTransactionTags,
                                    transactionTagsNotAdded: transactionTagsNotAdded,
                                    setTransactionTagsNotAdded: setTransactionTagsNotAdded,
                                });
                            }}
                        />
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
                        tagTestIDPrefix={"allTags"}
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
    allTags: {
        marginTop: 40,
        paddingBottom: 15,
    },
    tagsAdded: {
        marginBottom: -13,
    },
});
