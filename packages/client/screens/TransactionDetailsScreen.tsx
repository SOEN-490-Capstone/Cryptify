import React from "react";
import { View } from "../components/Themed";
import { Box } from "native-base";
import { StyleSheet } from "react-native";
import { TransactionDetails } from "../components/TransactionDetails";

export default function TransactionDetailsScreen() {

    const tran ={
        "transactionAddress": "0x6c2e96ffb0bb0cd349a64ec01d918958aaabb4c07e8d092608b0ef19fe724c20",
        "walletIn": "0x196eb04d2ed49dc16d00ac3d68e95e57dc7641c5",
        "walletOut": "0x4827f065ee8d939e92d941fb1e48106b4ecd0ea4",
        "amount": "0.33",
        "createdAt": new Date("2022-01-31T23:01:23.000Z")
    };

    return (
        <View style={styles.view}>
            <Box marginTop="10px"></Box>
            <TransactionDetails transaction={tran} walletAddress={"0x196eb04d2ed49dc16d00ac3d68e95e57dc7641c5"} />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
