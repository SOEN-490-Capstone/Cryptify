import React from "react";
import { SettingsStackScreenProps } from "../types";
import { Button, VStack } from "native-base";
import { Alert, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { AuthContext } from "../components/contexts/AuthContext";
import { WalletsGateway } from "../gateways/wallets_gateway";
import MultiLineListItem from "../components/list/MultiLineListItem";
import SingleLineListItem from "../components/list/SingleLineListItem";
import WalletDetailsComponent from "../components/WalletDetailsComponent";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

function getBtcFormat(address: string): string {
    if (address.charAt(0) == "1") {
        return "P2PKH";
    } else if (address.charAt(0) == "3") {
        return "P2SH";
    } else if (address.charAt(0) == "b") {
        return "Bech32";
    } else {
        return "";
    }
}

export default function WalletSettingsScreen({ navigation, route }: SettingsStackScreenProps<"WalletSettingsScreen">) {
    const { token, user } = React.useContext(AuthContext);
    const walletsGateway = new WalletsGateway();

    function handleDeleteWallet(): void {
        Alert.alert("Do you want to remove this wallet?", "You cannot undo this action.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: async () => {
                    await walletsGateway.deleteWallet({ id: user.id, address: route.params.wallet.address }, token);
                    navigation.goBack();
                },
            },
        ]);
    }

    return (
        <View style={styles.view}>
            <VStack space={"30px"}>
                <WalletDetailsComponent wallet={route.params.wallet} />
                <VStack space={"20px"}>
                    <MultiLineListItem label="Name" value={route.params.wallet.name} />
                    <MultiLineListItem label="Address" value={route.params.wallet.address} copy={true} />
                    {route.params.wallet.currencyType === CurrencyType.BITCOIN && (
                        <SingleLineListItem label="Format" value={getBtcFormat(route.params.wallet.address)} />
                    )}
                </VStack>
                <Button
                    variant="outline"
                    _text={{ color: "error.500" }}
                    onPress={handleDeleteWallet}
                    testID="removeWalletButton"
                >
                    Remove wallet
                </Button>
            </VStack>
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
});
