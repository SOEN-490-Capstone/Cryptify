import React from "react";
import { View } from "../../../components/Themed";
import { Button, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falEnvelope } from "../../../components/icons/light/falEnvelope";
import { GuestStackScreenProps } from "../../../types";

export default function ResetPasswordFailureScreen(navigation: GuestStackScreenProps<"ResetPasswordFailureScreen">) {
    return (
        <View style={styles.container}>
            <VStack style={styles.content}>
                <FontAwesomeIcon icon={falEnvelope} color={"#0077E6"} style={styles.envelopeIcon} size={96} />
                <Text size={"title3"} fontWeight={"semibold"}>
                    Could Not Send Email
                </Text>
                <Text style={{ paddingHorizontal: 40, marginTop: 15, textAlign: "center" }}>
                    An error occured while sending password recovery instructions to your email.
                </Text>
            </VStack>

            <VStack style={styles.footer}>
                <Button onPress={() => navigation.navigation.goBack()} style={{ width: "100%", marginBottom: 20 }}>
                    Try again
                </Button>
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: "center",
    },
    content: {
        flex: 1,
        alignItems: "center",
        marginTop: 50,
    },
    footer: {
        alignItems: "center",
        marginBottom: 15,
        justifyContent: "center",
    },
    envelopeIcon: {
        marginTop: 20,
        marginBottom: 30,
    },
});
