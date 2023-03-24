import React from "react";
import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Text, HStack, Pressable, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farChevronRight } from "../components/icons/regular/farChevronRight";
import { SettingsStackScreenProps } from "../types";
import { falWallet } from "../components/icons/light/falWallet";
import SignOutButton from "../components/SignOutButton";
import { falTags } from "../components/icons/light/falTags";
import { falBell } from "../components/icons/light/falBell";
import { falAddressBook } from "../components/icons/light/falAddressBook";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { falUser } from "../components/icons/light/falUser";
import { titleCase } from "@cryptify/common/src/utils/string_utils";

type SettingsItem = {
    text: string;
    onPress: () => void;
    icon: IconDefinition;
};

export default function SettingsScreen({ navigation }: SettingsStackScreenProps<"SettingsScreen">) {
    const items: SettingsItem[] = [
        {
            text: "account",
            onPress: () => navigation.navigate("AccountScreen"),
            icon: falUser,
        },
        {
            text: "wallets",
            onPress: () =>
                navigation.navigate("ViewWalletsScreen", {
                    isSettingsTab: true,
                }),
            icon: falWallet,
        },
        {
            text: "contacts",
            onPress: () => navigation.navigate("ContactsListScreen", {}),
            icon: falAddressBook,
        },
        {
            text: "tags",
            onPress: () => navigation.navigate("TagsSettingsScreen"),
            icon: falTags,
        },
        {
            text: "notifications",
            onPress: () => navigation.navigate("NotificationsScreen"),
            icon: falBell,
        },
    ];

    return (
        <View style={styles.view}>
            <Text size={"title1"} fontWeight={"semibold"}>
                Settings
            </Text>
            <VStack space="2px" marginTop="20px">
                {items.map((item) => (
                    <Pressable
                        onPress={item.onPress}
                        style={styles.button}
                        _pressed={{
                            background: "text.200",
                        }}
                        testID={`${item.text}Button`}
                        key={item.text}
                    >
                        <HStack height="50px" alignItems="center">
                            <FontAwesomeIcon icon={item.icon} style={styles.icon} size={26} />
                            <Text style={styles.buttonText}>{titleCase(item.text)}</Text>
                            <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                        </HStack>
                    </Pressable>
                ))}
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
    button: {
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonText: {
        marginLeft: 15,
    },
    icon: {
        color: "#404040",
    },
    chevronRightIcon: {
        color: "#A3A3A3",
        marginLeft: "auto",
    },
});
