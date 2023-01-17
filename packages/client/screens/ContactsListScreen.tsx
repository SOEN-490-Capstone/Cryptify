import React from "react";
import { FlatList } from "react-native";
import { Box, Text } from "native-base";
import { ContactsGateway } from "../gateways/contacts_gateway";
import { AuthContext } from "../components/contexts/AuthContext";
import { View } from "../components/Themed";
import { useIsFocused } from "@react-navigation/native";

export default function ContactsListScreen() {
    const contactsGateway = new ContactsGateway();

    const isFocused = useIsFocused();

    const { token, user } = React.useContext(AuthContext);
    const [contactsWithHeader, setContactsWithHeader] = React.useState<any[]>([]);

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
        <View style={{ flex: 1 }}>
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
        </View>
    );
}