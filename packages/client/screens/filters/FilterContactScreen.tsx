import { View } from "../../components/Themed";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Text, Box, HStack, Center, Checkbox } from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
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

    async function handleCheckboxChange(contact: string) {
        if (route.params.contactFilters.includes(contact)) {
            route.params.contactFilters.splice(route.params.contactFilters.indexOf(contact), 1);
            route.params.setContactFilters(route.params.contactFilters);
        } else {
            route.params.contactFilters.push(contact);
            route.params.setContactFilters([...route.params.contactFilters]);
        }
    }

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

    React.useEffect(() => {
        (() => {
            navigation.setOptions({
                headerRight: () => (
                    <Pressable
                        onPress={() => (
                            route.params.contactFilters.splice(0),
                            route.params.setContactFilters([]),
                            navigation.goBack()
                        )}
                    >
                        <Text color={"#007AFF"}>Reset</Text>
                    </Pressable>
                ),
            });
        })();
    });

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
                                    {route.params.contactFilters.includes(item.contact.contactName) ? (
                                        <Checkbox
                                            style={{ paddingVertical: 10, marginHorizontal: 15 }}
                                            value={item.contact.contactName}
                                            defaultIsChecked
                                            onChange={() => handleCheckboxChange(item.contact.contactName)}
                                        >
                                            <Text style={{ paddingVertical: 10 }}>{item.contact.contactName}</Text>
                                        </Checkbox>
                                    ) : (
                                        <Checkbox
                                            style={{ paddingVertical: 10, marginHorizontal: 15 }}
                                            value={item.contact.contactName}
                                            onChange={() => handleCheckboxChange(item.contact.contactName)}
                                        >
                                            <Text style={{ paddingVertical: 10 }}>{item.contact.contactName}</Text>
                                        </Checkbox>
                                    )}
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