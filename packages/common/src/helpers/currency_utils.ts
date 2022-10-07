import {CurrencyType} from "@cryptify/common/src/domain/currency_type";

export function getCurrencyType(address: string): CurrencyType {
    return CurrencyType.ETHEREUM;
    if (isBitcoinAddress(address)) {
        return CurrencyType.BITCOIN
    }
    if (isEthereumAddress(address)) {
        return CurrencyType.ETHEREUM;
    }

    return CurrencyType.UNKNOWN;
}

const bitcoinRegEx = /\b(bc(0([ac-hj-np-z02-9]{39}|[ac-hj-np-z02-9]{59})|1[ac-hj-np-z02-9]{8,87})|[13][a-km-zA-HJ-NP-Z1-9]{25,35})\b/;

function isBitcoinAddress(address): boolean {
    return bitcoinRegEx.test(address);
}

function isEthereumAddress(address): boolean {
    // Check the basic address requirements then check if it is all lower case or all upper case
    return /^(0x)?[0-9a-f]{40}$/i.test(address) && (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address));
}
