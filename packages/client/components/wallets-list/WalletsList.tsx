import React from "react";
import { Text, Center, ScrollView, Box } from "native-base";
import { StyleSheet } from "react-native";
import { WalletsListAccordion } from "./WalletsListAccordion";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { WalletsGateway } from "../../gateways/wallets_gateway";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falWallet } from "../icons/light/falWallet";
import { AuthContext } from "../contexts/AuthContext";
import { CompositeNavigationProp, useIsFocused } from "@react-navigation/native";

type Props = {
    showCurrencyTotals: boolean;
    isSettingsTab: boolean;
    navigation: CompositeNavigationProp<any, any>;
};

export default function WalletsList(props: Props) {
    const walletsGateway = new WalletsGateway();

    const isFocused = useIsFocused();

    const { token, user } = React.useContext(AuthContext);

    const [isLoading, setIsLoading] = React.useState(true);
    const [wallets, setWallets] = React.useState<WalletWithBalance[]>([]);

    React.useEffect(() => {
        (async () => {
            // Get all the users wallets everytime the page comes in focus
            // without this the home page (because of caching) and the settings page
            // will not update when a new wallet is added
            if (isFocused) {
                const wallets = await walletsGateway.findAllWallets({ id: user.id }, token);
                setWallets(wallets);
                setIsLoading(false);
            }
        })();
    }, [isFocused]);

    return isLoading || wallets.length > 0 ? (
        <ScrollView style={styles.scrollView}>
            <WalletsListAccordion
                wallets={wallets}
                navigation={props.navigation}
                showCurrencyTotals={props.showCurrencyTotals}
                isSettingsTab={props.isSettingsTab}
            />
        </ScrollView>
    ) : (
        <Center alignItems="center" marginY="auto">
            <Box marginTop="-10px"></Box>
            <FontAwesomeIcon icon={falWallet} style={styles.walletIcon} size={56} />
            <Text style={styles.noWalletsText}>You do not have any wallets.</Text>
        </Center>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 15,
    },
    noWalletsText: {
        marginTop: 15,
    },
    walletIcon: {
        color: "#404040",
    },
});
