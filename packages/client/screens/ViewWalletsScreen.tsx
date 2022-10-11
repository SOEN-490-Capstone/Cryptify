import React from "react";
import { View } from "../components/Themed";
import { VStack, Text } from "native-base";
import { StyleSheet } from "react-native";
import AccordionView from "../components/WalletViewAccordian";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import StorageService from "../services/storage_service";
import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import WalletsGateway from "../gateways/wallets_gateway";
import UsersGateway from "../gateways/users_gateway";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWalletCustom } from "../components/icons/faWalletCustom";

export default function ViewWalletsScreen() {
    const [wallets, setWallets] = React.useState<WalletWithBalance[]>([]);

    React.useEffect(() => {
        (async () => {
            const token = await StorageService.get<JwtToken>("@jwt");
            if (!token) {
                return;
            }

            const { id } = await UsersGateway.whoami(token);
            const wallets = await WalletsGateway.findAllWallets({ id }, token);
            console.log(wallets);
            setWallets(wallets);
        })();
    }, []);

    return (
        <View style={styles.view}>
            {wallets ? (
                <>
                    <AccordionView />
                    <AccordionView />
                </>
            ) : (
                <VStack height="94px" alignItems="center">
                    <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={56} />
                    <Text style={styles.settingsListText}>You do not have any wallets.</Text>
                </VStack>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    settingsListText: {
        fontSize: 17,
        marginTop: 15,
    },
    walletIcon: {
        color: "#404040",
    },
});
