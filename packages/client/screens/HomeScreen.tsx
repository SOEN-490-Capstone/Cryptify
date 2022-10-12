import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { View } from "../components/Themed";
import React from "react";
import StorageService from "../services/storage_service";
import { Button, Text } from "native-base";
import { HomeStackScreenProps } from "../types";
import { useIsFocused } from "@react-navigation/native";
import { KEY_JWT } from "../constants/storage_keys";

export default function HomeScreen({ navigation }: HomeStackScreenProps<"HomeScreen">) {
    const isFocused = useIsFocused();
    const [token, setToken] = React.useState("");

    React.useEffect(() => {
        (async () => {
            const token = await StorageService.get<JwtToken>(KEY_JWT);
            setToken(token?.accessToken || "");
        })();
    }, [isFocused]);

    return (
        <View>
            <Text>Token: {token}</Text>
            <Button onPress={() => navigation.navigate("AddWalletSelectionScreen")}>Add a wallet</Button>
        </View>
    );
}
