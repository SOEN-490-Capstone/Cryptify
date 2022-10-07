import React from "react";
import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../../types";
import { titleCase } from "@cryptify/common/src/helpers/string_utils";
import { CompositeScreenProps } from "@react-navigation/native";
import { TitleTextWithIcon } from "../../components/TitleTextWithIcon";
import { Formik } from "formik";
import {Box, Button, Center, FormControl, Input, Spinner, VStack} from "native-base";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";
import { FormikHelpers } from "formik/dist/types";
import StorageService from "../../services/storage_service";
import { currenciesDisplayData } from "../../constants/CurrenciesDisplayData";
import WalletsGateway from "../../gateways/wallets_gateway";
import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import UsersGateway from "../../gateways/users_gateway";
import {CurrencyType} from "@cryptify/common/src/domain/currency_type";

type Props = {
    currencyType: CurrencyType;
}

export default function AddWalletLoadingScreen({ currencyType }: Props) {
    const displayData = currenciesDisplayData.find((currency) => currency.type == currencyType)!;

    return (
        <View style={styles.view}>
            <Box paddingTop="80px"></Box>
            <TitleTextWithIcon
                icon={displayData.icon}
                iconSize={48}
                iconStyles={styles[displayData.style]}
                textStyles={styles.title}
                space={20}
            >
                {displayData.loadingTitle}
            </TitleTextWithIcon>
            <Center style={{ flex: 1, marginBottom: 100 }}>
                <Spinner size={146} color="#0077E6" />
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        lineHeight: 27,
    },
    bitcoinIcon: {
        color: "#F7931A",
    },
    ethereumIcon: {
        color: "#3C3C3D",
    },
});
