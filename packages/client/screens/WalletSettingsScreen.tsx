import React from "react";
import { SettingsStackScreenProps } from "../types";
import { Button } from "native-base";
import { Alert, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { AuthContext } from "../components/contexts/AuthContext";
import { WalletsGateway } from "../gateways/wallets_gateway";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";

type Props = SettingsStackScreenProps<"WalletSettingsScreen">;

export default function WalletSettingsScreen({ navigation, route }: Props) {
    const { address, currencyType } = route.params;
    const { token, user } = React.useContext(AuthContext);
    const walletsGateway = new WalletsGateway();

    function handleDeleteWallet(): void {
        Alert.alert("Do you want to remove this wallet?", "You cannot undo this action.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: () => {
                    walletsGateway.deleteWallet(
                        { userId: user.id, address: address, currencyType: getCurrencyType(address) },
                        token,
                    );
                    navigation.goBack();
                },
            },
        ]);
    }

    return (
        <View style={styles.view}>
            <Button variant="outline" _text={{ color: "error.500" }} onPress={handleDeleteWallet}>
                Remove wallet
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
    },
    buttonStyle: {
        color: "white",
    },
});
