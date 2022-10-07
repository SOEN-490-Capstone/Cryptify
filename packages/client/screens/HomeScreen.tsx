import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { Text, View } from "../components/Themed";
import React from "react";
import StorageService from "../services/storage_service";
import { Button } from "native-base";
import { HomeStackScreenProps } from "../types";

export default function HomeScreen({ navigation }: HomeStackScreenProps<"HomeScreen">) {
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
            <Button onPress={() => navigation.navigate("AddWalletSelectionScreen")}>Add a wallet</Button>
        </View>
    );
}
