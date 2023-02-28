import React from "react";
import { SettingsStackScreenProps } from "../types";
import { Button } from "native-base";
import { Alert, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { AuthContext } from "../components/contexts/AuthContext";
import { WalletsGateway } from "../gateways/wallets_gateway";
import { getFormattedAmount, typeToISOCode } from "@cryptify/common/src/utils/currency_utils";
import { formatAddress } from "@cryptify/common/src/utils/address_utils";
import { Pressable, Box, Text, HStack, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { currencyTypeToIcon } from "../services/currency_service";
import MultiLineListItem from "../components/list/MultiLineListItem";


export default function WalletSettingsScreen({ navigation, route }: SettingsStackScreenProps<"WalletSettingsScreen">) {
    const { token, user } = React.useContext(AuthContext);
    const walletsGateway = new WalletsGateway();
    const currencyIcon = currencyTypeToIcon[route.params.wallet.currencyType];

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

            <Box
                style={styles.walletDetailsWrapper}
                backgroundColor={
                    route.params.wallet.currencyType == "BITCOIN" ? "rgba(247, 147, 26, 0.25)" : "rgba(60, 60, 61, 0.25)"
                }
            >
                <VStack style={styles.walletDetails}>
                    <HStack justifyContent="space-between">
                        <VStack>
                            <Text>{route.params.wallet.name}</Text>
                            <Box marginTop="2px"></Box>
                            <Text size={"subheadline"} color={"text.500"}>
                                {formatAddress(route.params.wallet.address)}
                            </Text>
                        </VStack>
                        <VStack>
                            <FontAwesomeIcon
                                icon={currencyIcon}
                                color={route.params.wallet.currencyType == "BITCOIN" ? "#F7931A" : "#3C3C3D"}
                                size={40}
                            />
                        </VStack>
                    </HStack>
                    <HStack alignItems="center">
                        <VStack>
                            <Box marginTop="40px" marginBottom="0"></Box>
                            <Text size={"subheadline"} color={"text.500"}>
                                {typeToISOCode[route.params.wallet.currencyType]}
                            </Text>
                            <Text size={"title3"}>{getFormattedAmount(route.params.wallet.balance, route.params.wallet.currencyType)}</Text>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
            <Box marginTop="20px" marginBottom="0"></Box>
            <VStack space={"20px"}>
                    <MultiLineListItem label="Name" value={route.params.wallet.name} />
                    <MultiLineListItem label="Address" value={route.params.wallet.address} copy={true} />
                </VStack>
            <Box marginTop="20px" marginBottom="0"></Box>

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
    walletDetailsWrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
    },
    walletDetails: {
        paddingVertical: 20,
        paddingRight: 0,
        borderTopWidth: 1,
        borderColor: "#E5E5E5",
    },
});
