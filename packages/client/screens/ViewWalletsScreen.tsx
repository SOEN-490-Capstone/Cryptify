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
<<<<<<< HEAD
            <Box marginTop="10px"></Box>
            <WalletsList navigation={navigation} showCurrencyTotals={false} />
=======
            {wallets ? (
                <ScrollView style={styles.scrollView}>
                    <WalletsListAccordion wallets={wallets} navigation={navigation} />
                </ScrollView>
            ) : (
                <Center alignItems="center" marginY="auto">
                    <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={56} />
                    <Text style={styles.noWalletsText}>You do not have any wallets.</Text>
                </Center>
            )}
>>>>>>> ae9a867 (finished wallet details screen)
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
