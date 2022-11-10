import React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { Text } from "native-base";

export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            <Text size={"title3"} fontWeight={"semibold"}>
                This screen doesn't exist.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: "#2e78b7",
    },
});
