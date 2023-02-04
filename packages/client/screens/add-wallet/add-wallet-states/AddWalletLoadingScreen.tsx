import React from "react";
import { View } from "../../../components/Themed";
import { StyleSheet } from "react-native";
import { TitleTextWithIcon } from "../../../components/TitleTextWithIcon";
import { Box, Center} from "native-base";
import { currenciesDisplayData } from "../../../constants/CurrenciesDisplayData";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import NotFoundScreen from "../../NotFoundScreen";
import LoadingSpinner from "../../../components/LoadingSpinner";


type Props = {
    currencyType: CurrencyType;
};

export default function AddWalletLoadingScreen({ currencyType }: Props) {
    const displayData = currenciesDisplayData.find((currency) => currency.type == currencyType);
    if (!displayData) {
        return <NotFoundScreen />;
    }

    return (
        <View style={styles.view}>
            <Box paddingTop="80px"></Box>
            <TitleTextWithIcon
                icon={displayData.icon}
                iconSize={48}
                iconStyles={styles[displayData.style]}
                textSize={"title3"}
                space={20}
            >
                {displayData.loadingTitle}
            </TitleTextWithIcon>
            <Center style={{ flex: 1 }}>
                <LoadingSpinner/>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    bitcoinIcon: {
        color: "#F7931A",
    },
    ethereumIcon: {
        color: "#3C3C3D",
    },
});
