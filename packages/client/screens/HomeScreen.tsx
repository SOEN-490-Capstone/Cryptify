import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { View } from "../components/Themed";
import React from "react";
import StorageService from "../services/storage_service";
import { Button, Text } from "native-base";
import { HomeStackScreenProps } from "../types";
import { useIsFocused } from "@react-navigation/native";
import { KEY_JWT } from "../constants/storage_keys";
import {AuthContext} from "../components/contexts/AuthContext";

export default function HomeScreen({ navigation }: HomeStackScreenProps<"HomeScreen">) {
    const { token } = React.useContext(AuthContext);

    return (
        <View>
            <Text testID="token">Token: {token}</Text>
            <Button onPress={() => navigation.navigate("AddWalletSelectionScreen")}>Add a wallet</Button>
        </View>
    );
}
