import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Box, Text } from "native-base";

export default function ContactsListScreen (){
    const datatodisplay =  [
        { name: "Movies", header: true },
        { name: "Interstellar", header: false },
        { name: "Dark Knight", header: false },
        { name: "Pop", header: false },
        { name: "Pulp Fiction", header: false },
        { name: "Burning Train", header: false },
        { name: "Music", header: true },
        { name: "Adams", header: false },
        { name: "Nirvana", header: false },
        { name: "Amrit Maan", header: false },
        { name: "Oye Hoye", header: false },
        { name: "Eminem", header: false },
        { name: "Places", header: true },
        { name: "Jordan", header: false },
        { name: "Punjab", header: false },
        { name: "Ludhiana", header: false },
        { name: "Jamshedpur", header: false },
        { name: "India", header: false },
        { name: "People", header: true },
        { name: "Jazzy", header: false },
        { name: "Appie", header: false },
        { name: "Baby", header: false },
        { name: "Sunil", header: false },
        { name: "Arrow", header: false },
        { name: "Things", header: true },
        { name: "table", header: false },
        { name: "chair", header: false },
        { name: "fan", header: false },
        { name: "cup", header: false },
        { name: "cube", header: false }
      ]

    // var stickyHeaderIndices: any[] = [];
    // const stickyHeaderIndices = datatodisplay
    //     .map(obj => obj.header ? datatodisplay.indexOf(obj) : null)
    //     .filter((x) => x != null);
    const stickyHeaderIndices = datatodisplay.flatMap(obj => obj.header ? [datatodisplay.indexOf(obj)] : []);

    return (
        <FlatList
            data={datatodisplay}
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
