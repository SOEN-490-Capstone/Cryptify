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
import { Contact } from "@cryptify/common/src/domain/entities/contact";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"ContactsListScreen">,
    SettingsStackScreenProps<"ContactsListScreen">
>;

export default function ContactsListScreen({ route, navigation }: Props) {
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

    async function onSubmit(contact: Contact) {
        const isQuickEdit = !!route.params.prefilledWalletAddress;

        if (isQuickEdit) {
            const walletAddrs = [
                ...contact.addresses.map((addr) => addr.walletAddress),
                route.params.prefilledWalletAddress,
            ];
            await contactsGateway.updateContact(
                {
                    contactName: contact.contactName,
                    userId: user.id,
                    walletAddrs,
                },
                token,
            );

            navigation.goBack();
        } else {
            navigation.navigate("ContactOverviewScreen", {
                contact,
            });
        }
    }

    // TODO use a more efficient way of getting these indicies
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
                                <Pressable
                                    onPress={() => onSubmit(item.contact)}
                                    _pressed={{ background: "text.200" }}
                                    testID="contactListItem"
                                >
                                    <Text style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                                        {item.contact.contactName}
                                    </Text>
                                </Pressable>
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
        paddingTop: 20,
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
