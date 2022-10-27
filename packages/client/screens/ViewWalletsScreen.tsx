import React from "react";
import { View } from "../components/Themed";
import { Box } from "native-base";
import { StyleSheet } from "react-native";
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
