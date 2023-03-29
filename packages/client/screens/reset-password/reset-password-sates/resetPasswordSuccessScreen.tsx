import React from "react";
import { View } from "../../../components/Themed";
import { Button, Center, HStack, Link, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falEnvelope } from "../../../components/icons/light/falEnvelope";
import { openInbox } from "react-native-email-link";
import { GuestStackScreenProps } from "../../../types";

export default function ResetPassworSuccessScreen({ navigation }: GuestStackScreenProps<"ResetPasswordSuccessScreen">) {
    return (
        <View style={styles.view}>
            <Center alignItems="center">
                <FontAwesomeIcon icon={falEnvelope} color={"#0077E6"} style={styles.envelopeIcon} size={96} />
                <Text size={"title3"} fontWeight={"semibold"} marginBottom="15px" marginTop="30px">
                    Check Your Email
                </Text>
                <Text textAlign={"center"}>
                    We have sent password recovery instructions to your email.
                </Text>
            </Center>
            <Center style={{ flex: 1 }}></Center>
            <VStack space={"20px"} marginBottom="20px">
                <Button onPress={() => openInbox()}>
                    Open email app
                </Button>
                <Text style={{flexDirection: 'row', bottom: 0}} size={"callout"} textAlign={"center"}>
                    <Text  >Did not receive the email? Check your spam filter, or </Text>
                    <Link _text={{ color: "darkBlue.500", fontWeight: "semibold", fontSize: "callout"}} isUnderlined={false} marginBottom={"-2.5px"} onPress={navigation.goBack}>
                        try another email address
                    </Link>
                </Text>
            </VStack>
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
