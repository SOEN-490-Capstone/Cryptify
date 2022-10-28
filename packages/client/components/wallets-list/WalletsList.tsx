import React from "react";
import { Text, Center, ScrollView, Box } from "native-base";
import { StyleSheet } from "react-native";
import { WalletsListAccordion } from "./WalletsListAccordion";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { WalletsGateway } from "../../gateways/wallets_gateway";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWalletCustom } from "../icons/faWalletCustom";
import { AuthContext } from "../contexts/AuthContext";
import { HomeStackScreenProps } from "../../types";

type Props = {
    showCurrencyTotals: boolean;
    navigation: HomeStackScreenProps<"ViewWalletsScreen">;
};

export default function WalletsList(props: Props) {
    const walletsGateway = new WalletsGateway();

    const { token, user } = React.useContext(AuthContext);

    const [wallets, setWallets] = React.useState<WalletWithBalance[]>([]);

    React.useEffect(() => {
        (async () => {
            const wallets = await walletsGateway.findAllWallets({ id: user.id }, token);
            setWallets(wallets);
        })();
    }, []);

    return wallets ? (
        <ScrollView style={styles.scrollView}>
            <WalletsListAccordion wallets={wallets} navigation={props.navigation} showCurrencyTotals={props.showCurrencyTotals} />
        </ScrollView>
    ) : (
        <Center alignItems="center" marginY="auto">
            <Box marginTop="-10px"></Box>
            <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={56} />
            <Text style={styles.noWalletsText}>You do not have any wallets.</Text>
        </Center>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 15,
    },
    noWalletsText: {
        fontSize: 17,
        lineHeight: 23,
        marginTop: 15,
    },
    walletIcon: {
        color: "#404040",
    },
});
