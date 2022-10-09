import React from "react";
import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import SignOutButton from "../components/SignOutButton";
import {Text, HStack, Pressable, FlatList, Box } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRightCustom } from "../components/icons/faChevronRightCustom";
import {SettingsStackScreenProps } from "../types";
import { faWalletCustom } from "../components/icons/faWalletCustom";

export default function SettingsScreen({ navigation }: SettingsStackScreenProps<"ViewWalletsScreen">) {
    const data = [
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            listItemTitle: "Wallets",
        },
    ];
    return (
        <View style={styles.view}>
            <SignOutButton />
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Box >
                        <Pressable
                            onPress={() => navigation.navigate("ViewWalletsScreen")}
                            style={styles.settingsListItem}
                            _pressed={{
                                background: "text.200",
                            }}
                        >
                            <HStack height="50px" alignItems="center">
                                <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={26} />
                                <Text style={styles.settingsListText} >{item.listItemTitle}</Text>
                                <FontAwesomeIcon icon={faChevronRightCustom} style={styles.chevronRightIcon} size={16} />
                            </HStack>
                        </Pressable>
                    </Box>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    settingsListItem: {
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    settingsListText: {
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
