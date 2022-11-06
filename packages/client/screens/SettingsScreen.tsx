import React from "react";
import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Text, HStack, Pressable, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRightCustom } from "../components/icons/faChevronRightCustom";
import { SettingsStackScreenProps } from "../types";
import { faWalletCustom } from "../components/icons/faWalletCustom";
import SignOutButton from "../components/SignOutButton";

export default function SettingsScreen({ navigation }: SettingsStackScreenProps<"SettingsScreen">) {
    return (
        <View style={styles.view}>
            <VStack space="15px">
                <Pressable
                    onPress={() => navigation.navigate("ViewWalletsScreen")}
                    style={styles.viewWalletsButton}
                    _pressed={{
                        background: "text.200",
                    }}
                    testID="walletsButton"
                >
                    <HStack height="50px" alignItems="center">
                        <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={26} />
                        <Text style={styles.viewWalletsButtonText}>Wallets</Text>
                        <FontAwesomeIcon icon={faChevronRightCustom} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                </Pressable>
                <SignOutButton />
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    viewWalletsButton: {
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    viewWalletsButtonText: {
        fontSize: 17,
        lineHeight: 23,
        marginLeft: 15,
    },
    walletIcon: {
        color: "#404040",
    },
    chevronRightIcon: {
        color: "#A3A3A3",
        marginLeft: "auto",
        marginRight: 5,
    },
});
