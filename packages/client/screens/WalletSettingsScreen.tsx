import React from "react";
import { SettingsStackScreenProps } from "../types";
import { Button } from "native-base";
import { Alert, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { AuthContext } from "../components/contexts/AuthContext";
import { WalletsGateway } from "../gateways/wallets_gateway";
import { Box, VStack } from "native-base";
import MultiLineListItem from "../components/list/MultiLineListItem";
import WalletDetailsComponent from "../components/WalletDetailsComponent";

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
            <WalletDetailsComponent wallet={route.params.wallet} />
            <Box marginTop="20px"></Box>
            <VStack space={"20px"}>
                <MultiLineListItem label="Name" value={route.params.wallet.name} />
                <MultiLineListItem label="Address" value={route.params.wallet.address} copy={true} />
            </VStack>
            <Box marginTop="20px"></Box>

            <Button
                variant="outline"
                _text={{ color: "error.500" }}
                onPress={handleDeleteWallet}
                testID="removeWalletButton"
            >
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
});
