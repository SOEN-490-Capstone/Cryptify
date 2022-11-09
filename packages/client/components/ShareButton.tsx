import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable } from "native-base";
import React from "react";
import { Share } from "react-native";
import { currencyTagToName } from "../services/currency_service";
import { faArrowUpBracket} from "./icons/regular/faArrowUpFromBracket";

type Props = {
    currencyType: string;
    address: string;
};

export function AddressShareButton({ currencyType, address }: Props) {
    const currencyName = currencyTagToName.get(currencyType);

    async function onShare() {
        await Share.share({
            message: `${titleCase(currencyName ? currencyName : "")} Wallet Address:\r\n${address}`,
        });
    }

    return (
        <Pressable onPress={onShare}>
            <FontAwesomeIcon icon={faArrowUpBracket} size={22} />
        </Pressable>
    );
}
