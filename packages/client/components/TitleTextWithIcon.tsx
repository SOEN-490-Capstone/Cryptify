import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { Text } from "./Themed";
import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, FontAwesomeIconStyle } from "@fortawesome/react-native-fontawesome";
import { VStack } from "native-base";

type Props = {
    icon: IconDefinition;
    iconStyles: FontAwesomeIconStyle;
    iconSize: number;
    textStyles: StyleProp<TextStyle>;
    space: number;
    children: React.ReactNode;
};

export function TitleTextWithIcon({ icon, iconStyles, iconSize, textStyles, space, children }: Props) {
    return (
        <VStack space={`${space}px`} alignItems="center">
            <FontAwesomeIcon icon={icon} style={iconStyles} size={iconSize} />
            <Text style={[styles.title, textStyles]}>{children}</Text>
        </VStack>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "600",
    },
});
