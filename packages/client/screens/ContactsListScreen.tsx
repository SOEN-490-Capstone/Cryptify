import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Box, Center, Text } from "native-base";
import { ContactsGateway } from "../gateways/contacts_gateway";
import { AuthContext } from "../components/contexts/AuthContext";
import { View } from "../components/Themed";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falAddressBook } from "../components/icons/light/falAddressBook";

export default function ContactsListScreen() {
    const contactsGateway = new ContactsGateway();

    const isFocused = useIsFocused();

    const { token, user } = React.useContext(AuthContext);
    const [contactsWithHeader, setContactsWithHeader] = React.useState<ContactWithHeader[]>([]);

    React.useEffect(() => {
        (async () => {
            const contacts = await contactsGateway.findAllContacts({ id: user.id }, token);

            let currChar = "";
            const listData = contacts.flatMap((contact) => {
                if (contact.contactName.charAt(0).toUpperCase() !== currChar) {
                    currChar = contact.contactName.charAt(0).toUpperCase();
                    return [
                        { name: currChar, header: true },
                        { name: contact.contactName, header: false },
                    ];
                } else {
                    return [{ name: contact.contactName, header: false }];
                }
            });

            setContactsWithHeader(listData);
        })();
    }, [isFocused]);

    const stickyHeaderIndices = contactsWithHeader.flatMap((obj) =>
        obj.header ? [contactsWithHeader.indexOf(obj)] : [],
    );

    return (
        <View style={styles.view}>
            {contactsWithHeader.length === 0 ? (
                <Center alignItems="center" marginY="auto">
                    <Box marginTop="-10px"></Box>
                    <FontAwesomeIcon icon={falAddressBook} style={styles.contactBook} size={56} />
                    <Text style={styles.contactBookText}>You do not have any contacts.</Text>
                </Center>
            ) : (
                <FlatList
                    data={contactsWithHeader}
                    renderItem={({ item }) => (
                        <>
                            {item.header ? (
                                <Box background={"text.100"}>
                                    <Text
                                        color={"text.500"}
                                        fontWeight={"semibold"}
                                        style={{ paddingHorizontal: 15, paddingVertical: 5 }}
                                    >
                                        {item.name}
                                    </Text>
                                </Box>
                            ) : (
                                <Box background={"white"}>
                                    <Text style={{ paddingHorizontal: 15, paddingVertical: 10 }}>{item.name}</Text>
                                </Box>
                            )}
                        </>
                    )}
                    stickyHeaderIndices={stickyHeaderIndices}
                />
            )}
        </View>
    );
}

type ContactWithHeader = {
    name: string;
    header: boolean;
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    contactBook: {
        alignItems: "center",
    },
    contactBookText: {
        textAlign: "center",
        maxWidth: 265,
        marginTop: 15,
    },
});
