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
    const [contactFilters, setContactFilters] = React.useState<string[]>([...route.params.filterByContact]);

    async function handleCheckboxChange(contact: string) {
        if (contactFilters.includes(contact)) {
            setContactFilters((prev) => prev.filter((c) => c !== contact));

            route.params.filterByContact.splice(route.params.filterByContact.indexOf(contact), 1);
            route.params.setFilterByContact(route.params.filterByContact);
            route.params.setIsFilterSaved(false);
        } else {
            setContactFilters((prev) => [...prev, contact]);

            route.params.filterByContact.push(contact);
            route.params.setFilterByContact([...route.params.filterByContact]);
            route.params.setIsFilterSaved(false);
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
                headerRight: () =>
                    contactFilters.length > 0 && (
                        <Pressable
                            onPress={() => {
                                route.params.filterByContact.splice(0);
                                route.params.setFilterByContact([]);
                                setContactFilters([...route.params.filterByContact]);
                                route.params.setIsFilterSaved(false);
                            }}
                        >
                            <Text color={"#007AFF"} fontWeight={"semibold"}>
                                Reset
                            </Text>
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
                    <FontAwesomeIcon icon={falAddressBook} size={56} />
                    <Text marginTop={"15px"}>You do not have any contacts.</Text>
                </Center>
            ) : (
                <>
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
                                    <HStack key={item.contact.contactName}>
                                        <Checkbox
                                            style={{ paddingVertical: 10, marginLeft: 15 }}
                                            value={item.contact.contactName}
                                            isChecked={contactFilters.includes(item.contact.contactName)}
                                            onChange={() => handleCheckboxChange(item.contact.contactName)}
                                        >
                                            <Text style={{ paddingVertical: 10, paddingRight: 15 }} isTruncated>
                                                {item.contact.contactName}
                                            </Text>
                                        </Checkbox>
                                    </HStack>
                                )}
                            </>
                        )}
                        stickyHeaderIndices={stickyHeaderIndices}
                    />
                </>
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
});
