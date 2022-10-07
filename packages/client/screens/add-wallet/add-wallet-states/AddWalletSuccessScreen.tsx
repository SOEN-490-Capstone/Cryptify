import React from "react";
import { View } from "../../../components/Themed";
import { StyleSheet } from "react-native";
import { titleCase } from "@cryptify/common/src/helpers/string_utils";
import { TitleTextWithIcon } from "../../../components/TitleTextWithIcon";
import { Box, Button, Center } from "native-base";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { AddWalletState } from "./add_wallet_state";
import { faCircleCheckCustom } from "../../../components/icons/faCircleCheckCustom";
import { CompositeNavigationProp } from "@react-navigation/native";

type Props = {
    currencyType: CurrencyType;
    setState: React.Dispatch<React.SetStateAction<AddWalletState>>;
    walletName: string;
    navigation: CompositeNavigationProp<any, any>;
};

export default function AddWalletSuccessScreen({ currencyType, setState, walletName, navigation }: Props) {
    const buttonText = `Add another ${titleCase(currencyType)} wallet`;

    return (
        <View style={styles.view}>
            <Box paddingTop="130px"></Box>
            <TitleTextWithIcon
                icon={faCircleCheckCustom}
                iconSize={96}
                iconStyles={styles.successIcon}
                textStyles={styles.title}
                space={30}
            >
                Added {titleCase(currencyType)} Wallet
                {"\n"}
                {walletName}
            </TitleTextWithIcon>
            <Center style={{ flex: 1 }}></Center>
            <Button
                style={styles.successButton}
                _text={styles.successButtonText}
                onPress={() => setState(AddWalletState.FORM)}
            >
                {buttonText}
            </Button>
            <Button
                style={styles.backButton}
                _text={styles.backButtonText}
                onPress={() => {
                    navigation.goBack();
                    navigation.goBack();
                }}
            >
                Back to wallets
            </Button>
            <Box paddingTop="20px"></Box>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "#F0FDF4",
    },
    title: {
        fontSize: 20,
        lineHeight: 27,
        textAlign: "center",
    },
    successIcon: {
        color: "#22C55E",
        fontWeight: "300",
    },
    successButton: {
        marginTop: 7,
        backgroundColor: "#22C55E",
    },
    successButtonText: {
        fontSize: 17,
        lineHeight: 23,
    },
    backButton: {
        marginTop: 7,
        backgroundColor: "transparent",
    },
    backButtonText: {
        color: "#22C55E",
        fontSize: 17,
        lineHeight: 23,
    },
});
