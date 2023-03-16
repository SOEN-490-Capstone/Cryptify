import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falQRCode } from "./icons/light/falQRCode";
import { Alert, Linking, Pressable, StyleSheet } from "react-native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";

type Props = {
    fieldKey: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    currencyType: CurrencyType;
    navigation: CompositeNavigationProp<any, any>;
};

export function QRCodeScannerInputIcon(props: Props) {
    const [permission, requestPermission] = BarCodeScanner.usePermissions();

    const cameraAccessDeniedAlert = () => {
        Alert.alert(
            "Allow camera access in device settings",
            "Cryptify uses your device's camera to scan a wallet's QR code. \n\n Access was previously denied, please grant access from Settings.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Settings",
                    onPress: () => {
                        Linking.openSettings();
                    },
                },
            ],
        );
    };

    const displayQRCodeScannerScreen = async () => {
        const previousPermission = permission;

        requestPermission().then((permission) => {
            if (permission.granted) {
                props.navigation.navigate("QRCodeScannerScreen", {
                    fieldKey: props.fieldKey,
                    setFieldValue: props.setFieldValue,
                    currencyType: props.currencyType,
                });
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (previousPermission.status == "undetermined" && !permission.granted) {
                    return;
                } else {
                    cameraAccessDeniedAlert();
                }
            }
        });
    };

    return (
        <Pressable onPress={displayQRCodeScannerScreen} testID="QRCodeScannerInputIcon">
            <FontAwesomeIcon icon={falQRCode} style={styles.qrCodeIcon} size={20} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    qrCodeIcon: {
        color: "#404040",
        marginRight: 12,
    },
});
