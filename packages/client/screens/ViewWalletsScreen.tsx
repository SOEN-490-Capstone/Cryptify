import React from "react";
import { View } from "../components/Themed";
import {Text, Center, ScrollView, Box} from "native-base";
import { StyleSheet } from "react-native";
import { WalletsListAccordion } from "../components/wallets-list/WalletsListAccordion";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { WalletsGateway } from "../gateways/wallets_gateway";
import { UsersGateway } from "../gateways/users_gateway";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWalletCustom } from "../components/icons/faWalletCustom";
import { AuthContext } from "../components/contexts/AuthContext";
import WalletsList from "../components/wallets-list/WalletsList";

export default function ViewWalletsScreen() {
    return (
        <View style={styles.view}>
            <Box marginTop="10px"></Box>
            <WalletsList showCurrencyTotals={false} />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
