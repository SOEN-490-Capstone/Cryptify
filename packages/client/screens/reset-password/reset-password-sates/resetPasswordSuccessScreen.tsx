import React from "react";
import { View } from "../../../components/Themed";
import { Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farEnvelope } from "../../../components/icons/regular/farEnvelope";

export default function ResetPassworSuccessScreen() {
    return (<View style={styles.container}>
            <VStack style={styles.content}>
                <FontAwesomeIcon icon={farEnvelope} style={styles.envelopeIcon} size={22} />
                <Text size={"title1"}>Check Your Email</Text>
                <Text>We have sent password recovery instructions to your email</Text>
            </VStack>

            <VStack>
                <FontAwesomeIcon icon={farEnvelope} style={styles.envelopeIcon} size={22} />
                <Text size={"title1"}>Check Your Email</Text>
                <Text>We have sent password recovery instructions to your email</Text>
            </VStack>


        </View>);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    envelopeIcon: {
        width: 100,
        marginTop: 20,
        marginBottom: 20,
    }
})