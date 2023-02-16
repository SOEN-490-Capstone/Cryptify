import React from "react";
import { SettingsStackScreenProps } from "../../types";
import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import ContactsForm from "../../components/contacts/ContactsForm";

export default function EditContactScreen(props: SettingsStackScreenProps<"EditContactScreen">) {
    return (
        <View style={styles.view}>
            <ContactsForm
                prefilledWalletAddress={undefined}
                contact={props.route.params.contact}
                setContact={props.route.params.setContact}
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
