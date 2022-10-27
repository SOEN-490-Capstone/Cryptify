import { View } from "../components/Themed";
import React from "react";
import { StyleSheet } from "react-native";
import { Box, Button, Text, VStack } from "native-base";
import { GuestStackScreenProps } from "../types";
import { Logo } from "../components/icons/Logo";
import { WelcomeScreenBackground } from "../components/icons/WelcomeScreenBackground";

export default function WelcomeScreen({ navigation }: GuestStackScreenProps<"WelcomeScreen">) {
    return (
        <View style={styles.view}>
            <Box safeArea></Box>
            <Box style={styles.titleContainer}>
                <VStack space="20px">
                    <Logo />
                    <Text style={styles.subtext}>Crypto asset management{"\n"}made simple</Text>
                </VStack>
            </Box>
            <VStack space="15px" marginBottom="20px">
                <Button onPress={() => navigation.navigate("SignUpScreen")}>Sign up</Button>
                <Button variant="outline" onPress={() => navigation.navigate("SignInScreen")}>
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
