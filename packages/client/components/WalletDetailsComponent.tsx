import React from "react";
import { StyleSheet } from "react-native";
import { getFormattedAmount, typeToISOCode } from "@cryptify/common/src/utils/currency_utils";
import { formatAddress } from "@cryptify/common/src/utils/address_utils";
import { Box, Text, HStack, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { currencyTypeToIcon } from "../services/currency_service";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";

type Props = {
    wallet: WalletWithBalance;
};

export default function WalletDetailsComponent({ wallet }: Props) {
    const currencyIcon = currencyTypeToIcon[wallet.currencyType];

    return (
        <>
            <Box
                style={styles.walletDetailsWrapper}
                backgroundColor={
                    wallet.currencyType == "BITCOIN" ? "rgba(247, 147, 26, 0.25)" : "rgba(60, 60, 61, 0.25)"
                }
            >
                <VStack style={styles.walletDetails}>
                    <HStack justifyContent="space-between">
                        <VStack space={"2px"}>
                            <Text>{wallet.name}</Text>
                            <Text size={"subheadline"} color={"text.500"}>
                                {formatAddress(wallet.address)}
                            </Text>
                        </VStack>
                        <FontAwesomeIcon
                            icon={currencyIcon}
                            color={wallet.currencyType == "BITCOIN" ? "#F7931A" : "#3C3C3D"}
                            size={40}
                        />
                    </HStack>
                    <VStack justifyContent={"center"}>
                        <Box marginTop="40px"></Box>
                        <Text size={"subheadline"} color={"text.500"}>
                            {typeToISOCode[wallet.currencyType]}
                        </Text>
                        <Text size={"title3"}>{getFormattedAmount(wallet.balance, wallet.currencyType)}</Text>
                    </VStack>
                </VStack>
            </Box>
        </>
    );
}

const styles = StyleSheet.create({
    walletDetailsWrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
    },
    walletDetails: {
        paddingVertical: 20,
        paddingRight: 0,
        borderTopWidth: 1,
        borderColor: "#E5E5E5",
    },
});
