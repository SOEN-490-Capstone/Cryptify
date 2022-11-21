import React from "react";
import { View } from "../components/Themed";
import { Badge, Box, Center, HStack, Text } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falTags } from "../components/icons/light/falTags";
import { AuthContext } from "../components/contexts/AuthContext";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { TagsGateway } from "../gateways/tags_gateway";

export default function TagsSettingsScreen() {
    const tagsGateway = new TagsGateway();

    const { token, user } = React.useContext(AuthContext);

    const [tags, setTags] = React.useState<TransactionTag[]>([]);

    React.useEffect(() => {
        (async () => {
            const tags = await tagsGateway.findAlTags({ id: user.id }, token);
            setTags(tags);
        })();
    });

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
                    // TODO: Create a custom badge component. More information can be found https://github.com/SOEN-490-Capstone/Cryptify/pull/113
                    <Badge
                        rounded="md"
                        color="gray.100"
                        style={styles.badge}
                        key={i}
                        _text={{ fontSize: "subheadline", fontWeight: "semibold" }}
                    >
                        {tag.tagName}
                    </Badge>
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
    },
    tagIcon: {
        color: "#404040",
    },
    noTagsText: {
        marginTop: 15,
    },
});
