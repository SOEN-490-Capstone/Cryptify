import { View } from "../components/Themed";
import React from "react";
import { Button, Text } from "native-base";
import { HomeStackScreenProps } from "../types";
import { AuthContext } from "../components/contexts/AuthContext";

export default function HomeScreen({ navigation }: HomeStackScreenProps<"HomeScreen">) {
    const { token } = React.useContext(AuthContext);

    return (
        <View>
            <Text testID="token">Token: {token}</Text>
            <Button onPress={() => navigation.navigate("AddWalletSelectionScreen")}>Add a wallet</Button>
        </View>
    );
}
