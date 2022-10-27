import React from "react";
import { Button } from "native-base";
import { StyleSheet } from "react-native";
import StorageService from "../services/storage_service";
import { KEY_JWT } from "../constants/storage_keys";
import { AuthContext } from "./contexts/AuthContext";

export default function SignOutButton() {
    const { setToken } = React.useContext(AuthContext);

    function handleSignOut(): void {
        setToken("");
        StorageService.remove(KEY_JWT);
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
