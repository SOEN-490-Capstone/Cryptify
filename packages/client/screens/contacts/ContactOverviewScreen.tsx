import React from "react";
import { StyleSheet } from "react-native";
import { Pressable, Text } from "native-base";
import { View } from "../../components/Themed";
import { SettingsStackScreenProps } from "../../types";

export default function ContactOverviewScreen({
    route,
    navigation,
}: SettingsStackScreenProps<"ContactOverviewScreen">) {
    const [contact, setContact] = React.useState(route.params.contact);

    React.useEffect(() => {
        (() => {
            navigation.setOptions({
                headerRight: () => (
                    <Pressable
                        onPress={() =>
                            navigation.navigate("EditContactScreen", {
                                contact,
                                setContact,
                            })
                        }
                        testID="editContactButton"
                    >
                        <Text>Edit</Text>
                    </Pressable>
                ),
            });
        })();
    });

    return (
        <View style={styles.view}>
            <Text>{contact.contactName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: 10,
    },
});
