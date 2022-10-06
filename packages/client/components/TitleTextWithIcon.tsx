import {StyleProp, StyleSheet, TextStyle} from "react-native";
import {Text} from "./Themed";
import React from "react";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon, FontAwesomeIconStyle} from "@fortawesome/react-native-fontawesome";
import {VStack} from "native-base";

type Props = {
    icon: IconDefinition;
    iconStyles: FontAwesomeIconStyle;
    iconSize: number;
    textStyles: StyleProp<TextStyle>;
    children: string;
}

export function TitleTextWithIcon({ icon, iconStyles, iconSize, textStyles, children }: Props) {
    return (
        <VStack alignItems="center">
            <FontAwesomeIcon
                icon={icon}
                style={iconStyles}
                size={iconSize}
            />
            <Text style={[styles.title, textStyles]}>{children}</Text>
        </VStack>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#404040",
        fontWeight: "600",
    },
});
