import React from "react";
import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import SignOutButton from "../components/SignOutButton";

export default function SettingsScreen() {
    return (
        <View style={styles.view}>
            <SignOutButton />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
});
