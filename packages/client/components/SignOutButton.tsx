import React from "react";
import { Button } from "native-base";
import StorageService from "../services/storage_service";
import { KEY_JWT } from "../constants/storage_keys";
import { AuthContext } from "./contexts/AuthContext";

export default function SignOutButton() {
    const { setToken } = React.useContext(AuthContext);

    async function handleSignOut() {
        await StorageService.remove(KEY_JWT);
        setToken("");
    }

    return (
        <Button
            variant="outline"
            _text={{ color: "error.500" }}
            onPress={handleSignOut}
            marginTop="13px"
            testID="signOutButton"
        >
            Sign out
        </Button>
    );
}
