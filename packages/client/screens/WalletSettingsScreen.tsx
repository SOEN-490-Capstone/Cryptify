import React from "react";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { Pressable, Box, Text, HStack, VStack, Button } from "native-base";
import { StyleSheet } from "react-native";
import { falWallet } from "../components/icons/light/falWallet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View } from "../components/Themed";
import { faEthereum } from "../components/icons/brands/faEthereum";
import { farArrowRight } from "../components/icons/regular/farArrowRight";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionsGateway } from "../gateways/transactions_gateway";
import { AuthContext } from "../components/contexts/AuthContext";
import { falMagnifyingGlass } from "../components/icons/light/falMagnifyingGlass";
import { farQrCode } from "../components/icons/regular/farQrCode";
import { getTransactionByWallet } from "../services/transaction_service";
import { formatAddress } from "../services/address_service";
import { TransactionsList } from "../components/transactions-list/TransactionsList";

type Props = SettingsStackScreenProps<"WalletSettingsScreen">;

export default function WalletSettingsScreen({ route }: Props) {

    return (
        <View>
            <Button>
                Delete account
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    ethereumIcon: {
        color: "#3C3C3D",
    },
    walletDetailsWrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        marginHorizontal: 15,
        backgroundColor: "rgba(60, 60, 61, 0.25)",
        borderRadius: 10,
    },
    walletDetails: {
        paddingVertical: 20,
        paddingRight: 0,
        borderTopWidth: 1,
        borderColor: "#E5E5E5",
    },
    walletIcon: {
        color: "#404040",
        lineHeight: 20,
    },
    walletIconBackground: {
        backgroundColor: "rgba(60, 60, 61, 0.15)",
        padding: 12,
        borderRadius: 50,
    },
    button: {
        alignContent: "center",
        alignItems: "center",
    },
    transactionBox: {
        marginBottom: 20,
        marginTop: 30,
    },
    transactions: {
        paddingLeft: 15,
    },
    rightArrowIcon: {
        marginLeft: "auto",
        paddingRight: 15,
    },
    magnifyingGlass: {
        alignItems: "center",
    },
    magnifyingGlassText: {
        marginTop: 15,
    },
});
