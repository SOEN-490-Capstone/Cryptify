import React from "react";
import { View } from "../../../components/Themed";
import { Button, Center, Text } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falEnvelope } from "../../../components/icons/light/falEnvelope";
import { GuestStackScreenProps } from "../../../types";

export default function ResetPasswordFailureScreen({
    navigation,
}: GuestStackScreenProps<"ResetPasswordFailureScreen">) {
    return (
        <View style={styles.view}>
            <Center alignItems="center">
                <FontAwesomeIcon icon={falEnvelope} color={"#0077E6"} style={styles.envelopeIcon} size={96} />
                <Text size={"title3"} fontWeight={"semibold"} marginBottom="15px" marginTop="30px">
                    Could Not Send Email
                </Text>
                <Text textAlign={"center"}>
                    An error occured while sending password recovery instructions to your email.
                </Text>
            </Center>
            <Center style={{ flex: 1 }}></Center>
            <Button onPress={() => navigation.goBack()} marginBottom={"20px"}>
                Try again
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: "center",
    },
    envelopeIcon: {
        marginTop: 60,
    },
});
