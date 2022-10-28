import { Box, Text } from "native-base";
import { CurrencyDisplayData } from "../constants/CurrenciesDisplayData";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { getFormattedAmount } from "../services/currency_service";

type Props = {
    currency: CurrencyDisplayData;
    amount: string;
    amountStyles: StyleProp<TextStyle>;
    currencyCodeStyles: StyleProp<TextStyle>;
};

export function CurrencyAmount({ currency, amount, amountStyles, currencyCodeStyles }: Props) {
    const formattedAmount = getFormattedAmount(amount, currency.type);

    return (
        <>
            <Box flex={1}>
                <Text isTruncated style={amountStyles}>
                    {formattedAmount}
                </Text>
            </Box>
            <Text style={currencyCodeStyles}> {currency.currencyTag}</Text>
        </>
    );
}
