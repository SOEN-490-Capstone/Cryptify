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
                const listData = contacts
                    .map((contact) => contact.contactName)
                    .filter((name, pos, names) => names.indexOf(name) == pos)
                    .flatMap((name) => {
                        if (name.charAt(0).toUpperCase() !== currChar) {
                            currChar = name.charAt(0).toUpperCase();
                            return [
                                { name: currChar, header: true },
                                { name, header: false },
                            ];
                        } else {
                            return [{ name, header: false }];
                        }
                    });

                setContactsWithHeader(listData);
            }
        })();
    }, [isFocused]);

    async function onSubmit(contactName: string) {
        if (!route.params.prefilledWalletAddress) {
            navigation.navigate("EditContactScreen",{
                prefilledWalletAddress: "any"
            })
        }

        // Hack because the schema was not designed properly, there should only be a single array of wallet addresses
        // because it doesn't matter what currency type they are
        await contactsGateway.createContacts(
            {
                contactName,
                userId: user.id,
                ethWallets: [route.params.prefilledWalletAddress],
                btcWallets: [],
            },
            token,
        );

        navigation.goBack();
    }

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
                                <Pressable
                                    onPress={() => onSubmit(item.name)}
                                    _pressed={
                                        route.params.prefilledWalletAddress
                                            ? {
                                                  background: "text.200",
                                              }
                                            : {}
                                    }
                                    testID="contactListItem"
                                >
                                    <Text style={{ paddingHorizontal: 15, paddingVertical: 10 }}>{item.name}</Text>
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
