import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Text, HStack, Center, VStack } from "native-base";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import React from "react";
import { CompositeScreenProps } from "@react-navigation/native";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import QRCode from "react-native-qrcode-svg";
import RowItem from "../components/RowItem";
import { farCircleInfo } from "../components/icons/regular/farCircleInfo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Copy } from "../components/Copy";
import { typeToISOCode } from "@cryptify/common/src/utils/currency_utils";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"WalletQRCodeScreen">,
    SettingsStackScreenProps<"WalletQRCodeScreen">
>;

export default function WalletQRCodeScreen({ route }: Props) {
    const { address, name, currencyType } = route.params;

    return (
        <View style={styles.view}>
            <Text size={"subheadline"} testID="QRCodeHeader">
                Copy and share this information to add{" "}
                <Text style={{ fontWeight: "600" }}>
                    {titleCase(currencyType)} ({typeToISOCode[currencyType]}){" "}
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
                    <Text size={"subheadline"} color={"text.500"}>
                        Address
                    </Text>
                </HStack>
                <HStack space="10px">
                    <Text style={{ ...styles.address }}>{address}</Text>
                    <Copy label="Address" value={address} />
                </HStack>
            </VStack>

            <HStack style={styles.info} testID="QRCodeWarning">
                <FontAwesomeIcon icon={farCircleInfo} size={16} />
                <Text size={"footnote2"} style={styles.infoText}>
                    Never enter this address by hand and only send {titleCase(currencyType)} (
                    {typeToISOCode[currencyType]}) to this address.
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
        paddingLeft: 10,
    },
    copyIcon: {
        //darkBlue.500
        color: "#0077E6",
        paddingHorizontal: 10,
    },
    address: {
        flex: 1,
    },
});
