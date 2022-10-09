import React from "react";
import { StyleSheet } from "react-native";
import { titleCase } from "@cryptify/common/src/helpers/string_utils";
import { TitleTextWithIcon } from "../../../components/TitleTextWithIcon";
import { Box, Button, Center, Link, View } from "native-base";
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
        <View style={styles.view} backgroundColor="error.50">
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
                _text={styles.successButtonText}
                onPress={() => setState(AddWalletState.FORM)}
                backgroundColor={"error.500"}
            >
                Try again
            </Button>
            <Center marginTop="20px" marginBottom="15px">
                <Link
                    _text={{
                        color: "error.500",
                        ...styles.backButtonText,
                    }}
                    isUnderlined={false}
                    onPress={() => {
                        navigation.goBack();
                        navigation.goBack();
                    }}
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
        color: "#EF4444",
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
