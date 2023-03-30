import { View } from "../../components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { Text, ScrollView, Center, VStack } from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import { AuthContext } from "../../components/contexts/AuthContext";
import TagsGallery from "../../components/tags/TagsGallery";
import SortService from "../../services/sort_service";
import { farXMark } from "../../components/icons/regular/farXMark";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { farPlus } from "../../components/icons/regular/farPlus";
import { TagsGateway } from "../../gateways/tags_gateway";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falTags } from "../../components/icons/light/falTags";

export default function FilterTagScreen({ route, navigation }: HomeStackScreenProps<"FilterTagScreen">) {
    const tagsGateway = new TagsGateway();

    const { token, user } = React.useContext(AuthContext);

    const [transactionTags, setTransactionTags] = React.useState<Tag[]>([]);
    const [transactionTagsNotAdded, setTransactionTagsNotAdded] = React.useState<Tag[]>([]);

    React.useEffect(() => {
        (async () => {
            const tags = await tagsGateway.findAllTags({ id: user.id }, token);
            setTransactionTags(tags.filter((tag) => route.params.filterByTag.includes(tag.tagName)));
            setTransactionTagsNotAdded(tags.filter((tag) => !route.params.filterByTag.includes(tag.tagName)));
        })();
    }, []);

    function removeTransactionTag(tag: Tag) {
        setTransactionTags(transactionTags.filter((t) => t !== tag));
        setTransactionTagsNotAdded([...transactionTagsNotAdded, tag]);
        route.params.filterByTag.splice(route.params.filterByTag.indexOf(tag.tagName), 1);
        route.params.setFilterByTag(route.params.filterByTag);
    }

    function addTransactionTag(tag: Tag) {
        setTransactionTagsNotAdded(transactionTagsNotAdded.filter((t) => t !== tag));
        setTransactionTags([...transactionTags, tag]);
        route.params.filterByTag.push(tag.tagName);
        route.params.setFilterByTag([...route.params.filterByTag]);
    }

    React.useEffect(() => {
        (() => {
            navigation.setOptions({
                headerRight: () =>
                    transactionTags.length > 0 && (
                        <Pressable
                            onPress={() => {
                                route.params.filterByTag.splice(0);
                                route.params.setFilterByTag([]);
                                setTransactionTagsNotAdded([...transactionTagsNotAdded, ...transactionTags]);
                                setTransactionTags([]);
                            }}
                        >
                            <Text color={"#007AFF"} fontWeight={"semibold"}>
                                Reset
                            </Text>
                        </Pressable>
                    ),
            });
        })();
    });

    return (
        <View style={styles.view}>
            {transactionTags.length === 0 && transactionTagsNotAdded.length === 0 ? (
                <Center alignItems="center" marginY="auto">
                    <FontAwesomeIcon icon={falTags} size={56} />
                    <Text marginTop={"15px"}>You do not have any tags.</Text>
                </Center>
            ) : (
                <ScrollView style={styles.scrollView}>
                    <VStack space={"40px"}>
                        {transactionTags.length != 0 && (
                            <TagsGallery
                                title={"Selected Transaction"}
                                tags={SortService.sortTransactionTagsAlphabetically(transactionTags)}
                                onTagPress={(tag) => removeTransactionTag(tag)}
                                tagIcon={farXMark}
                                styles={styles.tagsAdded}
                            />
                        )}
                        {transactionTagsNotAdded.length != 0 && (
                            <TagsGallery
                                title={"All Tags"}
                                tags={SortService.sortTransactionTagsAlphabetically(transactionTagsNotAdded)}
                                onTagPress={(tag: Tag) => addTransactionTag(tag)}
                                tagIcon={farPlus}
                                styles={styles.allTags}
                                tagTestIDPrefix={"allTags"}
                            />
                        )}
                    </VStack>
                </ScrollView>
            )}
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
        paddingBottom: 15,
    },
    tagsAdded: {
        marginBottom: -13,
    },
});
