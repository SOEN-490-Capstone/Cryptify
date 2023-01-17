import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Box, Text } from "native-base";
import { ContactsGateway } from "../gateways/contacts_gateway";
import { AuthContext } from "../components/contexts/AuthContext";
import { Contact } from "@cryptify/common/src/domain/entities/contact";
import { View } from "../components/Themed";
import { useIsFocused } from "@react-navigation/native";

export default function ContactsListScreen (){

    const contactsGateway = new ContactsGateway();

    const isFocused = useIsFocused();

    const { token, user } = React.useContext(AuthContext);

    const [contacts, setContacts] = React.useState<any[]>([]);

    React.useEffect(() => {
        (async () => {
            const sortedContacts = await contactsGateway.findAllContacts({id: user.id}, token);

            let currChar = "";
            const listData = sortedContacts.flatMap((contact) => {
                if (contact.contactName.charAt(0).toUpperCase() !== currChar) {
                    currChar = contact.contactName.charAt(0).toUpperCase();
                    return [
                        {name: currChar, header: true},
                        {name: contact.contactName, header: false}
                    ]
                } else {
                    return [
                        {name: contact.contactName, header: false}
                    ]
                }
            });

            setContacts(listData);
        })();
    }, [isFocused]);

    const stickyHeaderIndices = contacts.flatMap(obj => obj.header ? [contacts.indexOf(obj)] : []);

    return (
        <View style={{flex: 1}}>
        <FlatList
            data={contacts}
            renderItem={({ item }) => (
                <>
                    {item.header? (
                        <Box background={"text.100"}>
                            <Text color={"text.500"} fontWeight={"semibold"} style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                                {item.name}
                            </Text>  
                        </Box>
                                               
                    ):(
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

// ["a", "aab, "aaax" , "bbb", "ccc"]
// create a dictionary with the alphabet as key and Contact[] as value
// and based on the first letter place the contact

const styles = StyleSheet.create({
    header: {
        backgroundColor: "Text.100"
    },
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 15,
    },
    badge: {
        marginBottom: 12,
    },
    tagIcon: {
        color: "#404040",
    },
    noTagsText: {
        marginTop: 15,
    },
    addTagButton: {
        marginLeft: "auto",
        flex: 0.5,
    },
    tagForm: {
        marginRight: "auto",
        flex: 1,
    },
    title: {
        marginBottom: 35,
    },
    tagList: {
        marginTop: 40,
        marginBottom: 20,
    },
});
