import { HStack, Pressable, Text } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
    tag: Tag;
    key: number;
    onTagPress?: (tag: Tag) => void | Promise<void>;
    tagIcon?: IconDefinition | IconProp;
    tagIconColor?: string | "#404040";
    tagStyles?: StyleProp<ViewStyle>;
    testID?: string | "tag";
};

export default function TagItem({ tag, key, onTagPress, tagIcon, tagIconColor, tagStyles, testID }: Props) {
    return (
        <Pressable
            onPress={() => {
                onTagPress && onTagPress(tag);
            }}
            borderRadius={"8px"}
            backgroundColor="gray.100"
            style={tagStyles ? tagStyles : styles.badge}
            key={key}
            testID={testID}
        >
            <HStack space={"10px"} alignItems={"center"}>
                <Text size={"subheadline"} fontWeight={"semibold"}>
                    {tag.tagName}
                </Text>
                {tagIcon && <FontAwesomeIcon icon={tagIcon} size={14} color={tagIconColor} />}
            </HStack>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 13,
        marginBottom: 13,
        justifyContent: "center",
    },
});
