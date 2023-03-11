import { View } from "../../components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { Text, ScrollView } from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import { AuthContext } from "../../components/contexts/AuthContext";
import TagsGallery from "../../components/tags/TagsGallery";
import SortService from "../../services/sort_service";
import { farXMark } from "../../components/icons/regular/farXMark";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { farPlus } from "../../components/icons/regular/farPlus";
import { TagsGateway } from "../../gateways/tags_gateway";

export default function FilterTagScreen({ route, navigation }: HomeStackScreenProps<"FilterTagScreen">) {
    const tagsGateway = new TagsGateway();

    const { token, user } = React.useContext(AuthContext);

    const [transactionTags, setTransactionTags] = React.useState<Tag[]>([]);
    const [transactionTagsNotAdded, setTransactionTagsNotAdded] = React.useState<Tag[]>([]);

    React.useEffect(() => {
        (async () => {
            const tags = await tagsGateway.findAllTags({ id: user.id }, token);
            setTransactionTags(tags.filter((tag)=> route.params.tagFilters.includes(tag.tagName)));
            setTransactionTagsNotAdded(tags.filter((tag) => !route.params.tagFilters.includes(tag.tagName)));
        })();
    }, []);

    function removeTransactionTag(tag: Tag) {
        setTransactionTags(transactionTags.filter((t) => t !== tag));
        setTransactionTagsNotAdded([...transactionTagsNotAdded, tag]);
        route.params.tagFilters.splice(route.params.tagFilters.indexOf(tag.tagName), 1);
        route.params.setTagFilters(route.params.tagFilters);
    }

    function addTransactionTag(tag: Tag) {
        setTransactionTagsNotAdded(transactionTagsNotAdded.filter((t) => t !== tag));
        setTransactionTags([...transactionTags, tag]);
        route.params.tagFilters.push(tag.tagName);
        route.params.setTagFilters([...route.params.tagFilters]);
    }

    React.useEffect(() => {
        (() => {
            navigation.setOptions({
                headerRight: () => (
                    <Pressable
                        onPress={() => (
                            route.params.tagFilters.splice(0), route.params.setTagFilters([]), navigation.goBack()
                        )}
                    >
                        <Text color={"#007AFF"}>Reset</Text>
                    </Pressable>
                ),
            });
        })();
    });

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                <TagsGallery
                    title={"Selected Transaction"}
                    tags={SortService.sortTransactionTagsAlphabetically(transactionTags)}
                    onTagPress={(tag) => removeTransactionTag(tag)}
                    tagIcon={farXMark}
                    styles={styles.tagsAdded}
                ></TagsGallery>
                {transactionTagsNotAdded.length != 0 && (
                    <TagsGallery
                        title={"All Tags"}
                        tags={SortService.sortTransactionTagsAlphabetically(transactionTagsNotAdded)}
                        onTagPress={(tag: Tag) => {
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
