import { HStack, Text, VStack } from "native-base";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import Tag from "./Tag";

type Props = {
    title?: string;
    tags: Tag[];
    onTagPress?: (tag: Tag) => void | Promise<void>;
    tagTestIDPrefix?: string;
    tagIcon?: IconDefinition | IconProp;
    tagIconColor?: string;
    styles?: StyleProp<ViewStyle>;
    tagsContainerStyles?: StyleProp<ViewStyle>;
    tagStyles?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
};

export default function TagsGallery({
    title,
    tags,
    onTagPress,
    tagTestIDPrefix,
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
                    <Tag
                        tag={tag}
                        key={i}
                        testID={tagTestIDPrefix ? `${tagTestIDPrefix}-${i}` : undefined}
                        onTagPress={onTagPress}
                        tagIcon={tagIcon}
                        tagIconColor={tagIconColor}
                        tagStyles={tagStyles}
                    />
                ))}
                {children}
            </HStack>
        </VStack>
    );
}
