import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable } from "native-base";
import React from "react";
import { Share } from "react-native";
import { faArrowUpBracket } from "./icons/regular/farArrowUpFromBracket";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

type Props = {
    currencyType: CurrencyType;
    address: string;
};

export function AddressShareButton({ currencyType, address }: Props) {
    async function onShare() {
        await Share.share({
            message: `${titleCase(currencyType)} Wallet Address:\r\n${address}`,
        });
    }

    return (
        <Pressable onPress={onShare}>
            <FontAwesomeIcon icon={faArrowUpBracket} size={22} />
        </Pressable>
    );
}
