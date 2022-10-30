import React from "react";
import { View } from "../components/Themed";
import { Box } from "native-base";
import { StyleSheet } from "react-native";
import WalletsList from "../components/wallets-list/WalletsList";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { CompositeScreenProps } from "@react-navigation/native";

type Props = {
    navigation: CompositeScreenProps<
        HomeStackScreenProps<"ViewWalletScreen">,
        SettingsStackScreenProps<"ViewWalletScreen">
    >;
};

export default function ViewWalletsScreen({ navigation }: Props) {
    return (
        <View style={styles.view}>
            <Box marginTop="10px"></Box>
            <WalletsList navigation={navigation} showCurrencyTotals={false} />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
