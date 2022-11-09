import { View } from "../components/Themed";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, VStack } from "native-base";
import { GuestStackScreenProps } from "../types";
import { Logo } from "../components/icons/Logo";
import { WelcomeScreenBackground } from "../components/icons/WelcomeScreenBackground";

export default function WelcomeScreen({ navigation }: GuestStackScreenProps<"WelcomeScreen">) {
    return (
        <View style={styles.view}>
            <VStack safeArea space="20px" style={styles.titleContainer}>
                <Logo testID="logo" />
                <Text style={styles.subtext}>Crypto asset management{"\n"}made simple</Text>
            </VStack>
            <VStack space="15px" marginBottom="20px">
                <Button onPress={() => navigation.navigate("SignUpScreen")} testID="signUpButton">
                    Sign up
                </Button>
                <Button variant="outline" onPress={() => navigation.navigate("SignInScreen")} testID="signInButton">
                    Sign in
                </Button>
            </VStack>
            <WelcomeScreenBackground style={styles.background} />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 20,
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    subtext: {
        fontSize: 20,
        lineHeight: 27,
        textAlign: "center",
    },
    background: {
        position: "absolute",
        zIndex: -1,
        top: -110,
        left: -280,
        right: 0,
        bottom: 0,
    },
});
