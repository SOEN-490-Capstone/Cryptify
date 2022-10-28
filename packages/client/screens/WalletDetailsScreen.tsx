import React from "react";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { CompositeScreenProps } from "@react-navigation/native";
import { Box, Button, Card, Text, HStack, VStack, Center } from "native-base";
import { Pressable, StyleSheet } from "react-native";
import { faWalletCustom } from "../components/icons/faWalletCustom";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

type Props = CompositeScreenProps<HomeStackScreenProps<"WalletDetailsScreen">, SettingsStackScreenProps<"WalletDetailsScreen">>;

export default function WalletDetailsScreen({ route, navigation }: Props) {

    const {address, name, currencyType, balance} = route.params;

    return (
        <Box>
        <Box style={styles.walletDetailsWrapper}>
            <HStack style={styles.walletDetails} alignItems="center">
                <VStack>
                    <Text style={styles.walletName}>{name}</Text>
                    <Box marginTop="2px"></Box>
                    <Text style={styles.walletAddress}>{address}</Text>
                    <Box marginTop="40px" marginBottom="0"></Box>
                    <Text style={styles.currencyType}>{currencyType}</Text>
                    <Text style={styles.walletBalance}>{balance}</Text>
                </VStack>
            </HStack>
        </Box>
        <Box marginTop="20px" marginBottom="0"></Box>
        <Center>
            <Pressable style={styles.button}>
                <Box style={styles.walletIconBackground}>
                    <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={20} />
                </Box>
                <Box marginTop="16px"></Box>
                <Text>Details</Text>
            </Pressable>
        </Center>
        </Box>
            );
}

const styles = StyleSheet.create({

    ethereumIcon: {
        color: "#3C3C3D",
    },
    walletDetailsWrapper: {
        paddingHorizontal: 20,
        marginHorizontal: 15,
        marginTop: 1,
        backgroundColor: 'rgba(60, 60, 61, 0.25)',
        borderRadius: 10,
    },
    walletDetails: {
        paddingVertical: 20,
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
    },
    walletIconBackground:{
        backgroundColor: "rgba(60, 60, 61, 0.15)",
        padding: 12,
        borderRadius: 50,
    },
    button: {
        alignContent: "center",
        alignItems: "center",
    }
});
