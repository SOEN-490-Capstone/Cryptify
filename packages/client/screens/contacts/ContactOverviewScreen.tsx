import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Box, Center, Pressable, Text } from "native-base";
import { ContactsGateway } from "../../gateways/contacts_gateway";
import { AuthContext } from "../../components/contexts/AuthContext";
import { View } from "../../components/Themed";
import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falAddressBook } from "../../components/icons/light/falAddressBook";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../../types";
import {Contact} from "@cryptify/common/src/domain/entities/contact";

export default function ContactOverviewScreen({ route, navigation }: SettingsStackScreenProps<"ContactOverviewScreen">) {
    return (
        <View style={styles.view}>
            <Text>{route.params.contact.contactName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: 10,
    },
});
