import {StyleSheet} from "react-native";
import {Text} from "./Themed";
import React from "react";

type Props = {
    children: string;
}

export function TitleText({ children }: Props) {
    return (
        <Text style={styles.title}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#404040",
        fontSize: 28,
        lineHeight: 37,
        fontWeight: "600",
        paddingTop: 10,
    },
});
