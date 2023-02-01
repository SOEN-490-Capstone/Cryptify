import React from "react";
import { View } from "../components/Themed";
import { Pressable, Link, ScrollView, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AuthContext } from "../components/contexts/AuthContext";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { TagsGateway } from "../gateways/tags_gateway";
import { farPencil } from "../components/icons/regular/farPencil";
import { SettingsStackScreenProps } from "../types";
import { farPlus } from "../components/icons/regular/farPlus";
import { useIsFocused } from "@react-navigation/native";
import TagsGallery from "../components/tags/TagsGallery";
import { falTags } from "../components/icons/light/falTags";

export default function TagsSettingsScreen(props: SettingsStackScreenProps<"TagsSettingsScreen">) {
    const tagsGateway = new TagsGateway();

    const isFocused = useIsFocused();

    const { token, user } = React.useContext(AuthContext);

    const [tags, setTags] = React.useState<Tag[]>([]);

    React.useEffect(() => {
        (async () => {
            if (isFocused) {
                const tags = await tagsGateway.findAllTags({ id: user.id }, token);
                setTags(tags);
            }
        })();
    }, [isFocused]);

    const [isEditMode, setIsEditMode] = React.useState<boolean>(false);

    React.useEffect(() => {
        (() => {
            props.navigation.setOptions({
                headerRight: () => (
                    <>
                        <Pressable
                            onPress={() => props.navigation.navigate("AddTagsScreen")}
                            style={styles.plusIcon}
                            testID="addTagButton"
                        >
                            <FontAwesomeIcon icon={farPlus} color="#404040" size={22} />
                        </Pressable>
                        {isEditMode ? (
                            <Link
                                onPress={() => setIsEditMode(false)}
                                isUnderlined={false}
                                _text={{
                                    color: "darkBlue.500",
                                    fontWeight: "semibold",
                                }}
                                testID="editTagDone"
                            >
                                Done
                            </Link>
                        ) : (
                            <Link onPress={() => setIsEditMode(true)} isUnderlined={false} testID="editTagEdit">
                                Edit
                            </Link>
                        )}
                    </>
                ),
            });
        })();
    }, [isEditMode]);

    return tags.length === 0 ? (
        <View style={styles.view}>
            <VStack space={"15px"} marginY="auto" alignItems={"center"}>
                <FontAwesomeIcon icon={falTags} style={styles.tagIcon} size={56} />
                <Text>You do not have any tags.</Text>
            </VStack>
        </View>
    ) : (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                <TagsGallery
                    tags={tags}
                    onTagPress={(tag) => {
                        if (isEditMode) {
                            props.navigation.navigate("EditTagScreen", { tag });
                        }
                    }}
                    tagIcon={isEditMode ? farPencil : undefined}
                    tagIconColor={"#0077E6"}
                    tagTestIDPrefix={`editTag`}
                    styles={{ paddingBottom: 15 }}
                />
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
    tagIcon: {
        color: "#404040",
    },
    plusIcon: {
        marginRight: 15,
    },
});
