import React from "react";
import { View } from "../components/Themed";
import { Text, HStack, Pressable, FlatList, Box, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWalletCustom } from "../components/icons/faWalletCustom";
import { StyleSheet } from "react-native";

export default function ViewWalletsScreen() {
    return (
        <View style={styles.view}>
            
            {/* <Box>
                <VStack height="94px" alignItems="center">
                    <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={56} />
                    <Text style={styles.settingsListText}>You do not have any wallets.</Text>
                </VStack>
            </Box> */}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
    },
    settingsListText: {
        fontSize: 17,
        marginTop: 15,
    },
    walletIcon: {
        color: "#404040",
    },
});
