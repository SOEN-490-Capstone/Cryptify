import React from "react";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../../types";
import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import ContactsForm from "../../components/contacts/ContactsForm";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"AddContactScreen">,
    SettingsStackScreenProps<"AddContactScreen">
>;

export default function AddContactScreen(props: Props) {
    return (
        <View style={styles.view}>
            <ContactsForm
                prefilledWalletAddress={props.route.params?.prefilledWalletAddress}
                contact={undefined}
                navigation={props.navigation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 15,
    },
});
