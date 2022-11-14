import React from "react";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { Pressable, Box, Text, HStack, VStack, Button } from "native-base";
import { Alert, StyleSheet } from "react-native";
import { falWallet } from "../components/icons/light/falWallet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View } from "../components/Themed";
import { faEthereum } from "../components/icons/brands/faEthereum";
import { farArrowRight } from "../components/icons/regular/farArrowRight";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionsGateway } from "../gateways/transactions_gateway";
import { AuthContext } from "../components/contexts/AuthContext";
import { falMagnifyingGlass } from "../components/icons/light/falMagnifyingGlass";
import { farQrCode } from "../components/icons/regular/farQrCode";
import { getTransactionByWallet } from "../services/transaction_service";
import { formatAddress } from "../services/address_service";
import { TransactionsList } from "../components/transactions-list/TransactionsList";
import { WalletsGateway } from "../gateways/wallets_gateway";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

type Props = SettingsStackScreenProps<"WalletSettingsScreen">;

export default function WalletSettingsScreen({ navigation, route }: Props) {
    const { address, currencyType } = route.params;
    const { token, user } = React.useContext(AuthContext);
    const walletsGateway = new WalletsGateway();

    function handleDeleteWallet(): void {
        Alert.alert(
            "Do you want to remove this wallet?",
            "You cannot undo this action.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", style: "destructive",
                onPress: () => {
                    walletsGateway.deleteWallet({userId: user.id, address: address, currencyType: currencyType}, token)
                    navigation.goBack()
                }
                }
            ]
          );
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
    buttonStyle:{
        color: "white"
    }
});
