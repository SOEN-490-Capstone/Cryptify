import React from "react";
import { StyleSheet } from "react-native";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { TitleTextWithIcon } from "../../../components/TitleTextWithIcon";
import { Box, Button, Center, Link, View } from "native-base";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { AddWalletState } from "./add_wallet_state";
import { faCircleCheck } from "../../../components/icons/light/faCircleCheck";
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
        <View style={styles.view} backgroundColor="success.50">
            <Box paddingTop="130px"></Box>
            <TitleTextWithIcon
                icon={faCircleCheck}
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
                _text={styles.successButtonText}
                onPress={() => setState(AddWalletState.FORM)}
                backgroundColor={"success.500"}
            >
                {buttonText}
            </Button>
            <Center marginTop="20px" marginBottom="15px">
                <Link
                    _text={{
                        color: "success.500",
                        ...styles.backButtonText,
                    }}
                    isUnderlined={false}
                    onPress={() => {
                        navigation.goBack();
                        navigation.goBack();
                    }}
                    testID="backToWalletsButton"
                >
                    Back to wallets
                </Link>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 20,
        lineHeight: 27,
        textAlign: "center",
    },
    successIcon: {
        color: "#22C55E",
    },
    successButtonText: {
        fontSize: 17,
        lineHeight: 23,
    },
    backButtonText: {
        fontSize: 17,
        lineHeight: 23,
        fontWeight: "600",
    },
});
