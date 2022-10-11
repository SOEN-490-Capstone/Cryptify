import { StyleSheet } from "react-native";
import { Text } from "native-base";
import React from "react";

type Props = {
    children: string;
};

export function TitleText({ children }: Props) {
    return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        lineHeight: 37,
        fontWeight: "600",
    },
});
