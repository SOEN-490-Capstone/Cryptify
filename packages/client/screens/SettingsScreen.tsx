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

export default function SettingsScreen({ navigation }: SettingsStackScreenProps<"SettingsScreen">) {
    return (
        <View style={styles.view}>
            <VStack space="15px">
                <Pressable
                    onPress={() =>
                        navigation.navigate("ViewWalletsScreen", {
                            isSettingsTab: true,
                        })
                    }
                    style={styles.button}
                    _pressed={{
                        background: "text.200",
                    }}
                    testID="walletsButton"
                >
                    <HStack height="50px" alignItems="center">
                        <FontAwesomeIcon icon={falWallet} style={styles.icon} size={26} />
                        <Text style={styles.buttonText}>Wallets</Text>
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("ContactsListScreen")}
                    style={styles.button}
                    _pressed={{
                        background: "text.200",
                    }}
                    testID="contactsButton"
                >
                    <HStack height="50px" alignItems="center">
                        <FontAwesomeIcon icon={falAddressBook} style={styles.icon} size={26} />
                        <Text style={styles.buttonText}>Contacts</Text>
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("TagsSettingsScreen")}
                    style={styles.button}
                    _pressed={{
                        background: "text.200",
                    }}
                    testID="tagsButton"
                >
                    <HStack height="50px" alignItems="center">
                        <FontAwesomeIcon icon={falTags} style={styles.icon} size={26} />
                        <Text style={styles.buttonText}>Tags</Text>
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("NotificationsScreen")}
                    style={styles.button}
                    _pressed={{
                        background: "text.200",
                    }}
                    testID="notificationButton"
                >
                    <HStack height="50px" alignItems="center">
                        <FontAwesomeIcon icon={falBell} style={styles.icon} size={26} />
                        <Text style={styles.buttonText}>Notifications</Text>
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
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
        marginRight: 5,
    },
});
