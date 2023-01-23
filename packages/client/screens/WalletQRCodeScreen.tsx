import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Text, HStack, Center, VStack } from "native-base";
import { HomeStackScreenProps } from "../types";
import React from "react";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import QRCode from "react-native-qrcode-svg";
import MultiLineListItem from "../components/list/MultiLineListItem";
import { farCircleInfo } from "../components/icons/regular/farCircleInfo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { typeToISOCode } from "@cryptify/common/src/utils/currency_utils";

export default function WalletQRCodeScreen({ route }: HomeStackScreenProps<"WalletQRCodeScreen">) {
    const wallet = route.params.wallet;

    return (
        <View style={styles.view}>
            <Text size={"subheadline"} testID="QRCodeHeader">
                Copy and share this information to add{" "}
                <Text style={{ fontWeight: "600" }}>
                    {titleCase(wallet.currencyType)} ({typeToISOCode[wallet.currencyType]}){" "}
                </Text>
                from another source. A{" "}
                <Text style={{ fontWeight: "600" }} underline>
                    network fee{" "}
                </Text>
                could be required for a transfer to this wallet.
            </Text>

            <Center style={styles.qrCode}>
                <QRCode value={wallet.address} size={200} logoMargin={0} />
            </Center>

            <VStack space={"15px"}>
                <MultiLineListItem label="Name" value={wallet.name} />
                <MultiLineListItem label="Address" value={wallet.address} copy={true} />
            </VStack>

            <HStack style={styles.info} testID="QRCodeWarning">
                <FontAwesomeIcon icon={farCircleInfo} size={16} />
                <Text size={"footnote2"} style={styles.infoText}>
                    Never enter this address by hand and only send {titleCase(wallet.currencyType)} (
                    {typeToISOCode[wallet.currencyType]}) to this address.
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
});
