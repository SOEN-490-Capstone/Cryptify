import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Text, HStack, Center, VStack } from "native-base";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import React from "react";
import { CompositeScreenProps } from "@react-navigation/native";
import { currencyTagToName } from "../services/currency_service";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import QRCode from "react-native-qrcode-svg";
import RowItem from "../components/RowItem";
import { faCircleInfoCustom } from "../components/icons/faCircleInfoCustom";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Copy } from "../components/Copy";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"WalletQRCodeScreen">,
    SettingsStackScreenProps<"WalletQRCodeScreen">
>;

export default function WalletQRCodeScreen({ route }: Props) {
    const { address, name, currencyType } = route.params;
    const currencyName = currencyTagToName.get(currencyType);

    return (
        <View style={styles.view}>
            <Text style={styles.text} testID="QRCodeHeader">
                Copy and share this information to add{" "}
                <Text style={{ fontWeight: "600" }}>
                    {titleCase(currencyName ? currencyName : "")} ({currencyType}){" "}
                </Text>
                from another source. A{" "}
                <Text style={{ fontWeight: "600" }} underline>
                    network fee{" "}
                </Text>
                could be required for a transfer to this wallet.
            </Text>

            <Center style={styles.qrCode}>
                <QRCode value={address} size={200} logoMargin={0} />
            </Center>

            <RowItem label="Name" value={name} />
            <VStack>
                <HStack>
                    <Text style={styles.label}>Address</Text>
                </HStack>
                <HStack space="10px">
                    <Text style={{ ...styles.address, color: "text.700" }}>{address}</Text>
                    <Copy label="Address" value={address} />
                </HStack>
            </VStack>

            <HStack style={styles.info} testID="QRCodeWarning">
                <FontAwesomeIcon icon={faCircleInfoCustom} size={16} />
                <Text style={styles.infoText}>
                    Never enter this address by hand and only send {titleCase(currencyName ? currencyName : "")} (
                    {currencyType}) to this address.
                </Text>
            </HStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 20,
    },
    text: {
        fontWeight: "400",
        fontSize: 15,
        lineHeight: 20,
    },
    qrCode: {
        paddingVertical: 20,
    },
    info: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "#FFEDD5",
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: "center",
    },
    infoText: {
        fontSize: 13,
        lineHeight: 17,
        fontWeight: "400",
        paddingLeft: 10,
    },
    copyIcon: {
        //darkBlue.500
        color: "#0077E6",
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 15,
        lineHeight: 20,
    },
    address: {
        fontSize: 17,
        lineHeight: 23,
        flex: 1,
    },
});
