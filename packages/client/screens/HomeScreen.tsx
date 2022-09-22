import { JwtToken } from "@cryptify/common/src/types/jwt_token";
import { Text } from "../components/Themed";
import React from "react";
import { get } from "../services/storage_service";

export default function HomeScreen() {
    const [token, setToken] = React.useState("");

    React.useEffect(() => {
        (async () => {
            const token = await get<JwtToken>("@jwt").catch();
            setToken(token.accessToken);
        })();
    }, []);

    return <Text>Token: {token}</Text>;
}
