import { JwtToken } from "@cryptify/common/src/types/jwt_token";
import { Text, View } from "../components/Themed";
import React from "react";
import StorageService from "../services/storage_service";

export default function HomeScreen() {
    const [token, setToken] = React.useState("");

    React.useEffect(() => {
        (async () => {
            const token = await StorageService.get<JwtToken>("@jwt");

            if (token != null) {
                setToken(token.accessToken);
            }
        })();
    }, []);

    return (
        <View>
            <Text>Token: {token}</Text>
        </View>
    );
}
