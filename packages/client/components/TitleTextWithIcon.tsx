import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, FontAwesomeIconStyle } from "@fortawesome/react-native-fontawesome";
import { VStack, Text } from "native-base";

type Props = {
    icon: IconDefinition;
    iconStyles: FontAwesomeIconStyle;
    iconSize: number;
    textSize: string;
    space: number;
    children: React.ReactNode;
};

export function TitleTextWithIcon({ icon, iconStyles, iconSize, textSize, space, children }: Props) {
    return (
        <VStack space={`${space}px`} alignItems="center">
            <FontAwesomeIcon icon={icon} style={iconStyles} size={iconSize} />
            <Text size={textSize} fontWeight={"semibold"}>
                {children}
            </Text>
        </VStack>
    );
}
