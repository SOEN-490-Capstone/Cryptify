import React, {Fragment} from "react";
import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../../types";
import { titleCase } from "@cryptify/common/src/helpers/string_utils";
import { CompositeScreenProps } from "@react-navigation/native";
import { TitleTextWithIcon } from "../../components/TitleTextWithIcon";
import { Formik } from "formik";
import {Button, FormControl, Input, VStack, Text, Box} from "native-base";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";
import { FormikHelpers } from "formik/dist/types";
import StorageService from "../../services/storage_service";
import { currenciesDisplayData } from "../../constants/CurrenciesDisplayData";
import WalletsGateway from "../../gateways/wallets_gateway";
import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import UsersGateway from "../../gateways/users_gateway";
import AddWalletFormScreen from "./AddWalletFormScreen";
import AddWalletLoadingScreen from "./AddWalletLoadingScreen";
import {AddWalletStatus} from "./add_wallet_status";
import AddWalletSuccessScreen from "./AddWalletSuccessScreen";
import {WalletWithBalance} from "@cryptify/common/src/domain/wallet_with_balance";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"AddWalletScreen">,
    SettingsStackScreenProps<"AddWalletScreen">
>;

export default function AddWalletScreen({ route, navigation }: Props) {
    const [status, setStatus] = React.useState(AddWalletStatus.SUCCESS);
    const [wallet, setWallet] = React.useState<WalletWithBalance | null>(null);

    const currencyType = route.params.currencyType;
    React.useLayoutEffect(() => {
        const headerShown = status == AddWalletStatus.FORM;
        navigation.setOptions({headerShown});
    }, [status, navigation, route]);

    if (status == AddWalletStatus.FORM) {
        return <AddWalletFormScreen currencyType={currencyType} setStatus={setStatus} setWallet={setWallet} />
    }
    if (status == AddWalletStatus.LOADING) {
        return <AddWalletLoadingScreen currencyType={currencyType} />
    }
    if (status == AddWalletStatus.SUCCESS) {
        return <AddWalletSuccessScreen currencyType={currencyType} setStatus={setStatus} wallet={wallet} />
    }
    if (status == AddWalletStatus.ERROR) {
        return <Text>error</Text>
    }

    return <View style={{ flex: 1 }}></View>
}
