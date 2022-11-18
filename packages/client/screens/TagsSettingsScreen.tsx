import React from "react";
import { View } from "../components/Themed";
import { Badge, Box, Center, HStack, Text } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falTags } from "../components/icons/light/falCircleArrowDownLeft copy";
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

    return tags.length == 0 ? (
        <View style={styles.view}>
            <Center alignItems="center" marginY="auto">
                <Box marginTop="-10px"></Box>
                <FontAwesomeIcon icon={falTags} style={styles.tagIcon} size={56} />
                <Text style={styles.noTagsText}>You do not have any tags.</Text>
            </Center>
        </View>
    ) : (
        <View style={styles.view}>
            <Box marginTop="10px"></Box>
            <HStack flexWrap="wrap">
                {tags.map((tag, i) => (
                    <Badge rounded="md" color="gray.100" style={styles.badge} key={i}>
                        <Text style={styles.text}>{tag.tagName}</Text>
                    </Badge>
                ))}
            </HStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 9.5,
        paddingTop: 32.5,
    },
    badge: {
        marginHorizontal: 6.5,
        marginBottom: 12,
    },
    text: {
        marginHorizontal: 7.5,
        marginVertical: 4,
        fontSize: 15,
        fontWeight: "600",
    },
    tagIcon: {
        color: "#404040",
    },
    noTagsText: {
        marginTop: 15,
    },
});
