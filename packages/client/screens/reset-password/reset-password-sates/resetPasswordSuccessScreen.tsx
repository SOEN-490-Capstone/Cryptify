import React from "react";
import { View } from "../../../components/Themed";
import { Button, Link, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falEnvelope } from "../../../components/icons/light/falEnvelope";
import { openInbox } from "react-native-email-link";

export default function ResetPassworSuccessScreen() {
    return (
        <View style={styles.container}>
            <VStack style={styles.content}>
                <FontAwesomeIcon icon={falEnvelope} color={"#0077E6"} style={styles.envelopeIcon} size={96} />
                <Text size={"title3"} fontWeight={"semibold"}>
                    Check Your Email
                </Text>
                <Text style={{ paddingHorizontal: 40, marginTop: 15, textAlign: "center" }}>
                    We have sent password recovery instructions to your email.
                </Text>
            </VStack>

            <VStack style={styles.footer}>
                <Button onPress={() => openInbox()} style={{ width: "100%", marginBottom: 20 }}>
                    Open email app
                </Button>
                <Text size={"callout"}>Did not receive the email? Check your spam filter, or</Text>
                <Link _text={{ color: "darkBlue.500", fontWeight: "semibold", size: "callout" }}>
                    try another email address
                </Link>
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
