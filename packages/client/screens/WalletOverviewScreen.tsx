import React from "react";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { Pressable, Box, Text, HStack, VStack, Center } from "native-base";
import { StyleSheet } from "react-native";
import { faWalletCustom } from "../components/icons/faWalletCustom";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View } from "../components/Themed";
import { faEthereumCustom } from "../components/icons/faEthereumCustom";
import { CompositeScreenProps } from "@react-navigation/native";
import { formatWalletAddress } from "@cryptify/common/src/utils/string_utils";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"WalletOverviewScreen">,
    SettingsStackScreenProps<"WalletOverviewScreen">
>;

export default function WalletOverviewScreen({ route, navigation }: Props) {
    const { address, name, currencyType, balance } = route.params;

    return (
        <View style={styles.view}>
            <Box style={styles.walletDetailsWrapper}>
                <VStack style={styles.walletDetails}>
                    <HStack justifyContent="space-between">
                        <VStack>
                            <Text style={styles.walletName}>{name}</Text>
                            <Box marginTop="2px"></Box>
                            <Text style={styles.walletAddress}>{formatWalletAddress(address)}</Text>
                        </VStack>
                        <VStack>
                            <FontAwesomeIcon icon={faEthereumCustom} style={styles.ethereumIcon} size={40} />
                        </VStack>
                    </HStack>
                    <HStack alignItems="center">
                        <VStack marginTop="40px">
                            <Text style={styles.currencyType}>{currencyType}</Text>
                            <Text style={{ ...styles.walletBalance, color: "text.700" }}>{balance}</Text>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
            <Box marginTop="20px" marginBottom="0"></Box>
            <Center>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate("WalletDetailsScreen", { address, name, currencyType, balance })}
                >
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
        paddingVertical: 20,
        marginHorizontal: 15,
        backgroundColor: "#3c3c3d",
        opacity: 0.2,
        borderRadius: 10,
    },
    walletDetails: {
        paddingVertical: 20,
        paddingRight: 0,
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
        backgroundColor: "#3c3c3d",
        opacity: 0.1,
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
