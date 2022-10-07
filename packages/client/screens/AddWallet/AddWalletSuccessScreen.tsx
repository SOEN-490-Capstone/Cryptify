import React from "react";
import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { titleCase } from "@cryptify/common/src/helpers/string_utils";
import { TitleTextWithIcon } from "../../components/TitleTextWithIcon";
import { Box, Button, Center } from "native-base";
import { currenciesDisplayData } from "../../constants/CurrenciesDisplayData";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { AddWalletStatus } from "./add_wallet_status";
import { faCircleCheckCustom } from "../../components/icons/faCircleCheckCustom";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";

type Props = {
    currencyType: CurrencyType;
    setStatus: React.Dispatch<React.SetStateAction<AddWalletStatus>>;
    wallet: WalletWithBalance | null;
};

export default function AddWalletSuccessScreen({ currencyType, setStatus, wallet }: Props) {
    const displayData = currenciesDisplayData.find((currency) => currency.type == currencyType)!;
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
                {wallet?.name}
            </TitleTextWithIcon>
            <Center style={{ flex: 1 }}></Center>
            <Button style={styles.successButton} _text={styles.successButtonText} onPress={() => {}}>
                {buttonText}
            </Button>
            <Button style={styles.backButton} _text={styles.backButtonText} onPress={() => {}}>
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
