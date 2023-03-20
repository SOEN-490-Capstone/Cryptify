import { Box, Center, Text, useToast, View } from "native-base";
import React from "react";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { CompositeScreenProps } from "@react-navigation/native";
import { BarCodeBounds, BarCodeScanner, Constants } from "expo-barcode-scanner";
import { StyleSheet } from "react-native";
import { getCurrencyTypeUILabel, isValidCurrencyAddress } from "@cryptify/common/src/utils/currency_utils";
import { StatusBar } from "expo-status-bar";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"QRCodeScannerScreen">,
    SettingsStackScreenProps<"QRCodeScannerScreen">
>;

const initialBounds: BarCodeBounds = { origin: { x: 0, y: 0 }, size: { width: 0, height: 0 } };

export default function QRCodeScannerScreen(props: Props) {
    const { setFieldValue, fieldKey, currencyType } = props.route.params;

    const toast = useToast();
    const toastId = "qrCodeScannerToast";

    const [scanned, setScanned] = React.useState(false);
    const [bounds, setBounds] = React.useState<BarCodeBounds>(initialBounds);

    const styles = getStyles(bounds);

    const sleep = (t: number | undefined) => new Promise((res) => setTimeout(res, t));

    const invalidAddressToast = (currencyType: string) => {
        if (!toast.isActive(toastId)) {
            toast.show({
                id: toastId,
                placement: "top",
                duration: 2500,
                render: () => {
                    return (
                        <Box style={styles.toastBox}>
                            <Center>
                                <Text
                                    size={"footnote1"}
                                    fontWeight={"semibold"}
                                    color={"white"}
                                    style={styles.toastText}
                                    textAlign={"center"}
                                >
                                    This QR Code does not contain a valid {currencyType} wallet address.
                                </Text>
                            </Center>
                        </Box>
                    );
                },
            });
        }
    };

    const handleBarCodeScanned = async ({ data, bounds }: any) => {
        setScanned(true);

        setBounds(bounds);

        // Add a small delay to allow the QR Code borders to be drawn before the
        // QR Code is scanned. This is to increase the user accessibility and experience.
        await sleep(350);

        if (!isValidCurrencyAddress(String(data), currencyType)) {
            invalidAddressToast(getCurrencyTypeUILabel(currencyType));
        } else {
            setFieldValue(fieldKey, String(data));
            props.navigation.goBack();
        }

        // Reset QR Code borders or else they will stay on the screen forever when a QR code is not scanned.
        setBounds(initialBounds);

        setScanned(false);
    };

    return (
        <View flex={1} style={{ position: "relative" }}>
            <StatusBar style="dark" hidden={true} />
            <BarCodeScanner
                barCodeTypes={[Constants.BarCodeType.qr]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.barCodeScanner}
            />
            {/* QR Code Focused Borders */}
            {bounds.origin !== initialBounds.origin && (
                <>
                    <View
                        style={[
                            styles.qrCodeBorder,
                            styles.horizontalBorder,
                            styles.borderTopLeft,
                            styles.borderTopRightRadius,
                            styles.borderBottomRightRadius,
                        ]}
                    />
                    <View
                        style={[
                            styles.qrCodeBorder,
                            styles.horizontalBorder,
                            styles.borderTopRight,
                            styles.borderTopLeftRadius,
                            styles.borderBottomLeftRadius,
                        ]}
                    />
                    <View
                        style={[
                            styles.qrCodeBorder,
                            styles.horizontalBorder,
                            styles.borderBottomLeft,
                            styles.borderTopRightRadius,
                            styles.borderBottomRightRadius,
                        ]}
                    />
                    <View
                        style={[
                            styles.qrCodeBorder,
                            styles.horizontalBorder,
                            styles.borderBottomRight,
                            styles.borderTopLeftRadius,
                            styles.borderBottomLeftRadius,
                        ]}
                    />
                    <View
                        style={[
                            styles.qrCodeBorder,
                            styles.verticalBorder,
                            styles.borderLeftTop,
                            styles.borderBottomRightRadius,
                            styles.borderBottomLeftRadius,
                        ]}
                    />
                    <View
                        style={[
                            styles.qrCodeBorder,
                            styles.verticalBorder,
                            styles.borderLeftBottom,
                            styles.borderTopLeftRadius,
                            styles.borderTopRightRadius,
                        ]}
                    />
                    <View
                        style={[
                            styles.qrCodeBorder,
                            styles.verticalBorder,
                            styles.borderRightTop,
                            styles.borderBottomRightRadius,
                            styles.borderBottomLeftRadius,
                        ]}
                    />
                    <View
                        style={[
                            styles.qrCodeBorder,
                            styles.verticalBorder,
                            styles.borderRightBottom,
                            styles.borderTopLeftRadius,
                            styles.borderTopRightRadius,
                        ]}
                    />
                </>
            )}
        </View>
    );
}

const getStyles = (bounds: { origin: any; size: any }) =>
    StyleSheet.create({
        barCodeScanner: {
            width: "100%",
            height: "100%",
        },
        qrCodeBorder: {
            position: "absolute",
            borderWidth: 1.5,
            borderColor: "#FFD60A",
        },
        horizontalBorder: {
            width: bounds.size.width * 0.2,
            height: 0,
        },
        verticalBorder: {
            width: 0,
            height: bounds.size.height * 0.2,
        },
        borderTopLeft: {
            left: bounds.origin.x,
            top: bounds.origin.y,
        },
        borderTopRight: {
            left: bounds.origin.x + bounds.size.width - bounds.size.width * 0.2,
            top: bounds.origin.y,
        },
        borderBottomLeft: {
            left: bounds.origin.x,
            top: bounds.origin.y + bounds.size.height,
        },
        borderBottomRight: {
            left: bounds.origin.x + bounds.size.width - bounds.size.width * 0.2 + 3,
            top: bounds.origin.y + bounds.size.height,
        },
        borderRightTop: {
            left: bounds.origin.x + bounds.size.width,
            top: bounds.origin.y,
        },
        borderRightBottom: {
            left: bounds.origin.x + bounds.size.width,
            top: bounds.origin.y + bounds.size.height - bounds.size.height * 0.2,
        },
        borderLeftTop: {
            left: bounds.origin.x,
            top: bounds.origin.y,
        },
        borderLeftBottom: {
            left: bounds.origin.x,
            top: bounds.origin.y + bounds.size.height - bounds.size.height * 0.2,
        },
        borderTopLeftRadius: {
            borderTopLeftRadius: 10,
        },
        borderTopRightRadius: {
            borderTopRightRadius: 10,
        },
        borderBottomRightRadius: {
            borderBottomRightRadius: 10,
        },
        borderBottomLeftRadius: {
            borderBottomLeftRadius: 10,
        },
        toastBox: {
            backgroundColor: "#404040",
            borderRadius: 100,
        },
        toastText: {
            paddingHorizontal: 25.5,
            paddingVertical: 10.5,
        },
    });
