import { HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
    title?: string;
    tags: TransactionTag[];
    onTagPress?: (tag: TransactionTag) => void | Promise<void>;
    tagIcon?: IconDefinition | IconProp;
    tagIconColor?: string | "#404040";
    styles?: StyleProp<ViewStyle>;
    tagsContainerStyles?: StyleProp<ViewStyle>;
    tagStyles?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
};

export default function TagsGallery({
    title,
    tags,
    onTagPress,
    tagIcon,
    tagIconColor,
    styles,
    tagsContainerStyles,
    tagStyles,
    children,
}: Props) {
    return (
        <VStack space={"20px"} style={styles}>
            {title && (
                <Text fontWeight={"semibold"} size={"title3"}>
                    {title}
                </Text>
            )}
            <HStack flexWrap={"wrap"} style={tagsContainerStyles}>
                {tags.map((tag, i) => (
                    // TODO create a badge component
                    <Pressable
                        onPress={() => {
                            onTagPress && onTagPress(tag);
                        }}
                        borderRadius={"8px"}
                        backgroundColor="gray.100"
                        style={tagStyles ? tagStyles : styl.badge}
                        key={i}
                        // TODO update system tests
                        testID="tag"
                    >
                        <HStack space={"10px"} alignItems={"center"}>
                            <Text size={"subheadline"} fontWeight={"semibold"}>
                                {tag.tagName}
                            </Text>
                            {tagIcon && <FontAwesomeIcon icon={tagIcon} size={14} color={tagIconColor} />}
                        </HStack>
                    </Pressable>
                ))}
                {children}
            </HStack>
        </VStack>
    );
}

const styl = StyleSheet.create({
    badge: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 13,
        marginBottom: 13,
        justifyContent: "center",
    },
});
