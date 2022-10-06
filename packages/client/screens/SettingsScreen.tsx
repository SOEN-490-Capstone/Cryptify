import React from "react";
import { View } from "../components/Themed";
import { Button } from "native-base";
import {Alert, StyleSheet} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
    const UserLogOut = () => {
        const navigation = useNavigation();

        const doUserLogOut = async function () {
            return await Parse.User.logOut()
                .then(async () => {
                    // To verify that current user is now empty, currentAsync can be used
                    const currentUser = await Parse.User.currentAsync();
                    // Navigation dispatch calls a navigation action, and popToTop will take
                    // the user back to the very first screen of the stack
                    navigation.dispatch(StackActions.popToTop());
                    return true;
                })
                .catch((error: { message: string | undefined }) => {
                    Alert.alert("Error!", error.message);
                    return false;
                });
        };
    };
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Button size="lg" variant="outline" colorScheme="red">
                Sign out
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        lineHeight: 32,
        fontWeight: "bold",
        textAlign: "center",
    },
    eyeIcon: {
        color: "#404040",
        marginRight: 12,
    },
});
