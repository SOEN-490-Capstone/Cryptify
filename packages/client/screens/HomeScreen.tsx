import { View } from "../components/Themed";
import React from "react";
import {Button, HStack, Pressable, Text, VStack} from "native-base";
import { HomeStackScreenProps } from "../types";
import { AuthContext } from "../components/contexts/AuthContext";
import WalletsList from "../components/wallets-list/WalletsList";
import { StyleSheet } from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCirclePlusSolidCustom} from "../components/icons/faCirclePlusSolidCustom";
import {faPlusCustom} from "../components/icons/faPlusCustom";

export default function HomeScreen({ navigation }: HomeStackScreenProps<"HomeScreen">) {
    const { token } = React.useContext(AuthContext);

    return (
        <View style={styles.view}>
            <VStack space="15px">
                <HStack style={styles.walletsListTitleContainer} justifyContent="space-between" alignItems="center">
                    <Text style={styles.walletsListTitle}>Wallets</Text>
                    <Pressable onPress={() => navigation.navigate("AddWalletSelectionScreen")}>
                        <FontAwesomeIcon icon={faCirclePlusSolidCustom} style={styles.addWalletIcon} size={22} />
                    </Pressable>
                </HStack>
                <WalletsList showCurrencyTotals={true} />
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    walletsListTitleContainer: {
        paddingHorizontal: 15,
        marginTop: 20,
    },
    walletsListTitle: {
        fontSize: 20,
        lineHeight: 27,
        fontWeight: "600",
    },
    addWalletIcon: {
        color: "#404040",
    },
});
