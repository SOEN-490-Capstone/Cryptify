import React from "react";
import { View } from "../components/Themed";
import { Box } from "native-base";
import { StyleSheet } from "react-native";
import WalletsList from "../components/wallets-list/WalletsList";
import { HomeStackScreenProps } from "../types";

type Props = {
    navigation: HomeStackScreenProps<"ViewWalletsScreen">;
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
