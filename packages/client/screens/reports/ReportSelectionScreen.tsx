import React from "react";
import { StyleSheet } from "react-native";
import { Text, HStack, Pressable, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { HomeStackScreenProps } from "../../types";
import { View } from "../../components/Themed";
import { farChevronRight } from "../../components/icons/regular/farChevronRight";
import { falFileInvoice } from "../../components/icons/light/falFileInvoice";

export default function ReportSelectionScreen({ route, navigation }: HomeStackScreenProps<"ReportSelectionScreen">) {
    return (
        <View style={styles.view}>
            <VStack space="15px">
                <Pressable
                    onPress={() =>
                        navigation.navigate("TransactionHistoryReportScreen", {
                            wallet: route.params.wallet,
                        })
                    }
                    style={styles.button}
                    _pressed={{
                        background: "text.200",
                    }}
                    testID="transactionHistoryButton"
                >
                    <HStack height="50px" alignItems="center">
                        <FontAwesomeIcon icon={falFileInvoice} style={styles.icon} size={26} />
                        <Text style={styles.buttonText}>Transaction History</Text>
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                </Pressable>
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 15,
    },
    button: {
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonText: {
        marginLeft: 15,
    },
    icon: {
        color: "#404040",
    },
    chevronRightIcon: {
        color: "#A3A3A3",
        marginLeft: "auto",
    },
});
