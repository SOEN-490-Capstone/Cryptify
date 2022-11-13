import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable } from "native-base";
import React from "react";
import { Share } from "react-native";
import { faArrowUpBracket } from "./icons/regular/farArrowUpFromBracket";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

type Props = {
<<<<<<< HEAD:packages/client/components/AddressShareButton.tsx
    currencyType: CurrencyType;
    address: string;
};

export function AddressShareButton({ currencyType, address }: Props) {
=======
    currencyTag: string;
    address: string;
};

export function AddressShareButton({ currencyTag, address }: Props) {
    const currencyName = currencyTagToName.get(currencyTag);

>>>>>>> 4a434f0 (renamed type to tag fixed overview icon):packages/client/components/ShareButton.tsx
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
