import React from "react";
import { View } from "../../components/Themed";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../../types";
import { CompositeScreenProps } from "@react-navigation/native";
import AddWalletFormScreen from "./add-wallet-states/AddWalletFormScreen";
import AddWalletLoadingScreen from "./add-wallet-states/AddWalletLoadingScreen";
import { AddWalletState } from "./add-wallet-states/add_wallet_state";
import AddWalletSuccessScreen from "./add-wallet-states/AddWalletSuccessScreen";
import AddWalletFailureScreen from "./add-wallet-states/AddWalletFailureScreen";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";

type Props = CompositeScreenProps<HomeStackScreenProps<"AddWalletScreen">, SettingsStackScreenProps<"AddWalletScreen">>;

export default function AddWalletScreen({ route, navigation }: Props) {
    const currencyType = route.params.currencyType;

    const [state, setState] = React.useState(AddWalletState.FORM);
    const [walletName, setWalletName] = React.useState<string>("");
    const [initialValues, setInitialValues] = React.useState<CreateWalletRequest>({
        userId: 0,
        address: "",
        name: "",
        currencyType,
    });

    React.useLayoutEffect(() => {
        const headerShown = state == AddWalletState.FORM;
        navigation.setOptions({ headerShown });
    }, [state, navigation, route]);

    if (state == AddWalletState.FORM) {
        return (
            <AddWalletFormScreen
                currencyType={currencyType}
                setState={setState}
                setWalletName={setWalletName}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
            />
        );
    }
    if (state == AddWalletState.LOADING) {
        return <AddWalletLoadingScreen currencyType={currencyType} />;
    }
    if (state == AddWalletState.SUCCESS) {
        return (
            <AddWalletSuccessScreen
                currencyType={currencyType}
                setState={setState}
                walletName={walletName}
                navigation={navigation}
            />
        );
    }
    if (state == AddWalletState.ERROR) {
        return (
            <AddWalletFailureScreen
                currencyType={currencyType}
                setState={setState}
                walletName={walletName}
                navigation={navigation}
            />
        );
    }

    return <View style={{ flex: 1 }}></View>;
}
