import React from "react";
import { View } from "../../components/Themed";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../../types";
import { CompositeScreenProps } from "@react-navigation/native";
import { Text } from "native-base";
import AddWalletFormScreen from "./AddWalletFormScreen";
import AddWalletLoadingScreen from "./AddWalletLoadingScreen";
import { AddWalletStatus } from "./add_wallet_status";
import AddWalletSuccessScreen from "./AddWalletSuccessScreen";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import AddWalletFailureScreen from "./AddWalletFailureScreen";

type Props = CompositeScreenProps<HomeStackScreenProps<"AddWalletScreen">, SettingsStackScreenProps<"AddWalletScreen">>;

export default function AddWalletScreen({ route, navigation }: Props) {
    const [status, setStatus] = React.useState(AddWalletStatus.FORM);
    const [walletName, setWalletName] = React.useState<string>("");

    const currencyType = route.params.currencyType;
    React.useLayoutEffect(() => {
        const headerShown = status == AddWalletStatus.FORM;
        navigation.setOptions({ headerShown });
    }, [status, navigation, route]);

    if (status == AddWalletStatus.FORM) {
        return <AddWalletFormScreen currencyType={currencyType} setStatus={setStatus} setWalletName={setWalletName} />;
    }
    if (status == AddWalletStatus.LOADING) {
        return <AddWalletLoadingScreen currencyType={currencyType} />;
    }
    if (status == AddWalletStatus.SUCCESS) {
        return <AddWalletSuccessScreen currencyType={currencyType} setStatus={setStatus} walletName={walletName} navigation={navigation} />;
    }
    if (status == AddWalletStatus.ERROR) {
        return <AddWalletFailureScreen currencyType={currencyType} setStatus={setStatus} walletName={walletName} navigation={navigation} />;
    }

    return <View style={{ flex: 1 }}></View>;
}
