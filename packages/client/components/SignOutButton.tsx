import React from "react";
import { Button } from "native-base";
import StorageService from "../services/storage_service";
import { KEY_JWT } from "../constants/storage_keys";
import { AuthContext } from "./contexts/AuthContext";

export default function SignOutButton() {
    const { setToken } = React.useContext(AuthContext);

    async function handleSignOut() {
        setToken("");
        await StorageService.remove(KEY_JWT);
    }

    return (
        <Button variant="outline" _text={{ color: "error.500" }} onPress={handleSignOut} testID="signOutButton">
            Sign out
        </Button>
    );
}
