import React from "react";
import { View } from "../components/Themed";
import { Pressable, Box, Center, HStack, Link, Text } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falTags } from "../components/icons/light/falTags";
import { AuthContext } from "../components/contexts/AuthContext";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { TagsGateway } from "../gateways/tags_gateway";
import { farPencil } from "../components/icons/regular/farPencil";
import { SettingsStackScreenProps } from "../types";

export default function TagsSettingsScreen(props: SettingsStackScreenProps<"TagsSettingsScreen">) {
    const tagsGateway = new TagsGateway();

    const { token, user } = React.useContext(AuthContext);

    const [tags, setTags] = React.useState<TransactionTag[]>([]);

    React.useEffect(() => {
        (async () => {
            const tags = await tagsGateway.findAlTags({ id: user.id }, token);
            setTags(tags);
        })();
    });
    const [isEditMode, setIsEditMode] = React.useState<boolean>(false);

    React.useEffect(() => {
        (() => {
            props.navigation.setOptions({
                headerRight: () => {
                    if (isEditMode) {
                        return (
                            <Link
                                onPress={() => setIsEditMode(false)}
                                isUnderlined={false}
                                _text={{
                                    color: "darkBlue.500",
                                    fontWeight: "semibold",
                                }}
                            >
                                Done
                            </Link>
                        );
                    }

                    return (
                        <Link onPress={() => setIsEditMode(true)} isUnderlined={false}>
                            Edit
                        </Link>
                    );
                },
            });
        })();
    }, [isEditMode]);

    return tags.length === 0 ? (
        <View style={styles.view}>
            <Center alignItems="center" marginY="auto">
                <FontAwesomeIcon icon={falTags} style={styles.tagIcon} size={56} />
                <Text style={styles.noTagsText}>You do not have any tags.</Text>
            </Center>
        </View>
    ) : (
        <View style={styles.view}>
            <Box marginTop="10px"></Box>
            <HStack flexWrap="wrap" space="13">
                {tags.map((tag, i) => (
                    <Pressable
                        onPress={() => {
                            if (isEditMode) {
                                props.navigation.navigate("EditTagScreen", { tag });
                            }
                        }}
                        rounded="md"
                        backgroundColor="gray.100"
                        style={styles.badge}
                        key={i}
                    >
                        <HStack style={styles.badgeContent}>
                            <Text style={styles.tagText} size={"subheadline"} fontWeight={"semibold"}>
                                {tag.tagName}
                            </Text>
                            {isEditMode && <FontAwesomeIcon icon={farPencil} style={styles.pencilIcon} size={13} />}
                        </HStack>
                    </Pressable>
                ))}
            </HStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 15,
    },
    badge: {
        marginBottom: 12,
        justifyContent: "center",
    },
    badgeContent: {
        alignItems: "center",
    },
    tagIcon: {
        color: "#404040",
    },
    tagText: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    pencilIcon: {
        marginVertical: 10,
        marginRight: 10,
        // darkBlue.500
        color: "#0077E6",
    },
    noTagsText: {
        marginTop: 15,
    },
});
