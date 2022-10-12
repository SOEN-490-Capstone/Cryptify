import React from "react";
import { Button } from "native-base";
import { StyleSheet } from "react-native";
import StorageService from "../services/storage_service";
import { KEY_JWT } from "../constants/storage_keys";

export default function SignOutButton() {
    async function handleSignOut(): Promise<void> {
        // TODO refactor this function to redirect user to welcome screen
        // this will be done automatically when the token is removed
        // after refactoring the navigation which will be done in Sprint 3
        // when the entire sign up / sign in flow is completed
        await StorageService.remove(KEY_JWT);
    }

    return (
        <Button variant="outline" _text={{ ...styles.signOutButtonText, color: "error.500" }} onPress={handleSignOut}>
            Sign out
        </Button>
    );
}

const styles = StyleSheet.create({
    signOutButtonText: {
        fontSize: 17,
        lineHeight: 23,
    },
});
