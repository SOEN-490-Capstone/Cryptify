import React from "react";
import { View } from "../components/Themed";
import { Text, Center, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { WalletsListAccordion } from "../components/WalletsListAccordion";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import StorageService from "../services/storage_service";
import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { WalletsGateway } from "../gateways/wallets_gateway";
import { UsersGateway } from "../gateways/users_gateway";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWalletCustom } from "../components/icons/faWalletCustom";

export default function ViewWalletsScreen() {
    const usersGateway = new UsersGateway();
    const walletsGateway = new WalletsGateway();

    const [wallets, setWallets] = React.useState<WalletWithBalance[]>([]);

    React.useEffect(() => {
        (async () => {
            const token = await StorageService.get<JwtToken>("@jwt");
            if (!token) {
                return;
            }

            const { id } = await usersGateway.whoami(token);
            const wallets = await walletsGateway.findAllWallets({ id }, token);
            setWallets(wallets);
        })();
    }, []);

    return (
        <View style={styles.view}>
            {wallets ? (
                <ScrollView style={styles.scrollView}>
                    <WalletsListAccordion wallets={wallets} />
                </ScrollView>
            ) : (
                <Center alignItems="center" marginY="auto">
                    <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={56} />
                    <Text style={styles.noWalletsText}>You do not have any wallets.</Text>
                </Center>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingTop: 10,
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
