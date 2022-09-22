import {JwtToken} from "@cryptify/common/src/types/jwt_token";
import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React from "react";
import {get} from "../services/storage_service";

export default function HomeScreen({ navigation }: RootTabScreenProps<"HomeScreen">) {
    const [token, setToken] = React.useState("");

    React.useEffect(() => {
        (async () => {
            const token = await get<JwtToken>("@jwt").catch();
            setToken(token.accessToken);
        })();
    }, []);

    return (
        <Text>
            Token: {token}
        </Text>
    );
}
