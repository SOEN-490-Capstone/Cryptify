import { View } from "../../components/Themed";
import { FlatList, StyleSheet } from "react-native";
import { Text, Radio, Box, Button, HStack, Link, Center, Checkbox } from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import DateBox from "../../components/DateBox";
import { getFiltersByDateStrings, getFiltersByTransactionStrings } from "../../services/filter_service";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../components/contexts/AuthContext";
import { falAddressBook } from "../../components/icons/light/falAddressBook";
import { ContactsGateway } from "../../gateways/contacts_gateway";
import { Contact } from "@cryptify/common/src/domain/entities/contact";

export default function FilterContactScreen({ route, navigation }: HomeStackScreenProps<"FilterContactScreen">) {
    const contactsGateway = new ContactsGateway();

    const isFocused = useIsFocused();

    const { token, user } = React.useContext(AuthContext);
    const [contactsWithHeader, setContactsWithHeader] = React.useState<ContactWithHeader[]>([]);

    React.useEffect(() => {
        (async () => {
            if (isFocused) {
                const contacts = await contactsGateway.findAllContacts({ id: user.id }, token);

                let currChar = "";
                const listData = contacts.flatMap((contact) => {
                    if (contact.contactName.charAt(0).toUpperCase() !== currChar) {
                        currChar = contact.contactName.charAt(0).toUpperCase();
                        return [
                            {
                                contact: {
                                    ...contact,
                                    contactName: currChar,
                                },
                                header: true,
                            },
                            { contact, header: false },
                        ];
                    } else {
                        return [{ contact, header: false }];
                    }
                });

                setContactsWithHeader(listData);
            }
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
                                        {item.contact.contactName}
                                    </Text>
                                </Box>
                            ) : (
                                <HStack>
                                    <Checkbox value={item.contact.contactName}>
                                    <Text style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                                        {item.contact.contactName}
                                    </Text>
                                    </Checkbox>
                                </HStack>
                                
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
    contact: Contact;
    header: boolean;
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 20,
    },
    RadioItem: {
        marginTop: 20,
    },
    applyButton: {
        marginTop: "auto",
    },
    applyButtonDisabled: {
        marginTop: "auto",
        opacity: 0.6,
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
