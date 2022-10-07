import React from "react";
import { View } from "../../../components/Themed";
import { StyleSheet } from "react-native";
import { titleCase } from "@cryptify/common/src/helpers/string_utils";
import { TitleTextWithIcon } from "../../../components/TitleTextWithIcon";
import { Box, Button, Center } from "native-base";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { AddWalletState } from "./add_wallet_state";
import { CompositeNavigationProp } from "@react-navigation/native";
import { faCircleXMarkCustom } from "../../../components/icons/faCircleXMarkCustom";

type Props = {
    currencyType: CurrencyType;
    setState: React.Dispatch<React.SetStateAction<AddWalletState>>;
    walletName: string;
    navigation: CompositeNavigationProp<any, any>;
};

export default function AddWalletFailureScreen({ currencyType, setState, walletName, navigation }: Props) {
    return (
        <View style={styles.view}>
            <Box paddingTop="130px"></Box>
            <TitleTextWithIcon
                icon={faCircleXMarkCustom}
                iconSize={96}
                iconStyles={styles.successIcon}
                textStyles={styles.title}
                space={30}
            >
                Could Not Add {titleCase(currencyType)} Wallet
                {"\n"}
                {walletName}
            </TitleTextWithIcon>
            <Center style={{ flex: 1 }}></Center>
            <Button
                style={styles.successButton}
                _text={styles.successButtonText}
                onPress={() => setState(AddWalletState.FORM)}
            >
                Try again
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
        backgroundColor: "#FEF2F2",
    },
    title: {
        fontSize: 20,
        lineHeight: 27,
        textAlign: "center",
    },
    successIcon: {
        color: "#EF4444",
        fontWeight: "300",
    },
    successButton: {
        marginTop: 7,
        backgroundColor: "#EF4444",
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
        color: "#EF4444",
        fontSize: 17,
        lineHeight: 23,
    },
});
