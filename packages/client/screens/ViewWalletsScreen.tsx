import React from "react";
import { View } from "../components/Themed";
import { Box } from "native-base";
import { StyleSheet } from "react-native";
import WalletsList from "../components/wallets-list/WalletsList";
import { SettingsStackScreenProps } from "../types";

export default function ViewWalletsScreen(props: SettingsStackScreenProps<"ViewWalletsScreen">) {
    return (
        <View style={styles.view}>
            <Box marginTop="10px"></Box>
            <WalletsList
                navigation={props.navigation}
                showCurrencyTotals={false}
                isSettingsTab={props.route.params.isSettingsTab}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
