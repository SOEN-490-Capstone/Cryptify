import React from "react";
import { StyleSheet } from "react-native";
import { TitleTextWithIcon } from "../../../components/TitleTextWithIcon";
import { Box, Button, Center, Link, View, VStack } from "native-base";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { AddWalletState } from "./add_wallet_state";
import { CompositeNavigationProp } from "@react-navigation/native";
import { falCircleXMark } from "../../../components/icons/light/falCircleXMark";
import { getCurrencyTypeUILabel } from "@cryptify/common/src/utils/currency_utils";

type Props = {
    currencyType: CurrencyType;
    setState: React.Dispatch<React.SetStateAction<AddWalletState>>;
    walletName: string;
    addWalletStartScreenName: string;
    navigation: CompositeNavigationProp<any, any>;
};

export default function AddWalletFailureScreen({
    currencyType,
    setState,
    walletName,
    addWalletStartScreenName,
    navigation,
}: Props) {
    return (
        <View style={styles.view} backgroundColor="error.50">
            <Box paddingTop="80px"></Box>
            <TitleTextWithIcon
                icon={falCircleXMark}
                iconSize={96}
                iconStyles={styles.successIcon}
                textSize={"title3"}
                space={30}
            >
                Could Not Add {getCurrencyTypeUILabel(currencyType)} Wallet
                {"\n"}
                {walletName}
            </TitleTextWithIcon>
            <Center style={{ flex: 1 }}></Center>
            <VStack space={"20px"} marginBottom="20px">
                <Button onPress={() => setState(AddWalletState.FORM)} backgroundColor={"error.500"}>
                    Try again
                </Button>
                <Center>
                    <Link
                        _text={{
                            color: "error.500",
                            fontWeight: "semibold",
                        }}
                        isUnderlined={false}
                        onPress={() => {
                            navigation.goBack();
                            navigation.goBack();
                        }}
                    >
                        Back to {addWalletStartScreenName === "HomeScreen" ? "home" : "wallets"}
                    </Link>
                </Center>
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
    },
    successIcon: {
        color: "#EF4444",
    },
});
