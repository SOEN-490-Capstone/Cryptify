import React from "react";
import { HomeStackScreenProps } from "../types";
import { Box, Text, HStack, VStack, Center } from "native-base";
import { Pressable, StyleSheet } from "react-native";
import { faWalletCustom } from "../components/icons/faWalletCustom";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View } from "../components/Themed";
import { faEthereumCustom } from "../components/icons/faEthereumCustom";

type Props = HomeStackScreenProps<"WalletDetailsScreen">;

export default function WalletDetailsScreen({ route }: Props) {
    const { address, name, currencyType, balance } = route.params;

    return (
        <View style={styles.view}>
            <Box style={styles.walletDetailsWrapper}>
                <VStack style={styles.walletDetails}>
                    <HStack justifyContent="space-between">
                        <VStack>
                            <Text style={styles.walletName}>{name}</Text>
                            <Box marginTop="2px"></Box>
                            <Text style={styles.walletAddress}>{address}</Text>
                        </VStack>
                        <VStack>
                            <FontAwesomeIcon icon={faEthereumCustom} style={styles.ethereumIcon} size={40} />
                        </VStack>
                    </HStack>
                    <HStack alignItems="center">
                        <VStack>
                            <Box marginTop="40px" marginBottom="0"></Box>
                            <Text style={styles.currencyType}>{currencyType}</Text>
                            <Text style={styles.walletBalance}>{balance}</Text>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
            <Box marginTop="20px" marginBottom="0"></Box>
            <Center>
                <Pressable style={styles.button}>
                    <Box style={styles.walletIconBackground}>
                        <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={20} />
                    </Box>
                </Pressable>
                <Box marginTop="4px"></Box>
                <Text style={styles.detailsText}>Details</Text>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    ethereumIcon: {
        color: "#3C3C3D",
    },
    walletDetailsWrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        marginHorizontal: 15,
        backgroundColor: "rgba(60, 60, 61, 0.25)",
        borderRadius: 10,
    },
    walletDetails: {
        paddingVertical: 20,
        paddingRight: 0,
        borderTopWidth: 1,
        borderColor: "#E5E5E5",
    },
    walletName: {
        fontSize: 17,
        lineHeight: 23,
    },
    walletAddress: {
        fontSize: 15,
        lineHeight: 20,
        color: "#737373",
    },
    currencyType: {
        fontSize: 15,
        lineHeight: 20,
        color: "#737373",
    },
    walletBalance: {
        fontSize: 20,
        lineHeight: 27,
    },
    walletIcon: {
        color: "#404040",
        fontWeight: "400",
        lineHeight: 20,
    },
    walletIconBackground: {
        backgroundColor: "rgba(60, 60, 61, 0.15)",
        padding: 12,
        borderRadius: 50,
    },
    button: {
        alignContent: "center",
        alignItems: "center",
    },
    detailsText: {
        fontWeight: "600",
        fontSize: 15,
        lineHeight: 20,
    },
});
