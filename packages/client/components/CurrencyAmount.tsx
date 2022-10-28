import { Box, Text } from "native-base";
import { CurrencyDisplayData } from "../constants/CurrenciesDisplayData";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import Web3 from "web3";

type Props = {
    currency: CurrencyDisplayData;
    amount: string;
    totalStyles: StyleProp<TextStyle>;
    currencyCodeStyles: StyleProp<TextStyle>;
};

export function CurrencyAmount({ currency, amount, totalStyles, currencyCodeStyles }: Props) {
    const etherAmount = currency.type == CurrencyType.ETHEREUM ? Web3.utils.fromWei(amount, "ether") : amount;

    return (
        <>
            <Box flex={1}>
                <Text isTruncated style={totalStyles}>
                    {etherAmount}
                </Text>
            </Box>
            <Text style={currencyCodeStyles}> {currency.currencyTag}</Text>
        </>
    );
}
