import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable } from "native-base";
import React from "react";
import { Share } from "react-native";
import { faArrowUpBracket } from "./icons/regular/farArrowUpFromBracket";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import {WalletWithBalance} from "@cryptify/common/src/domain/wallet_with_balance";

type Props = {
    wallet: WalletWithBalance;
};

export function AddressShareButton({ wallet }: Props) {
    async function onShare() {
        await Share.share({
            message: `${titleCase(wallet.currencyType)} Wallet Address:\r\n${wallet.address}`,
        });
    }

    return (
        <Pressable onPress={onShare}>
            <FontAwesomeIcon icon={faArrowUpBracket} size={22} />
        </Pressable>
    );
}
