import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { faBitcoin } from "../components/icons/brands/faBitcoin";
import { faEthereum } from "../components/icons/brands/faEthereum";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type CurrencyDisplayData = {
    type: CurrencyType;
    icon: IconDefinition;
    style: "bitcoinIcon" | "ethereumIcon";
    styles: {
        color: string,
    },
    title: string;
    addressInput: string;
    loadingTitle: string;
    currencyTag: string;
};

export const displayDataMap: { [key in CurrencyType]: CurrencyDisplayData } = {
    [CurrencyType.BITCOIN]: {
        type: CurrencyType.BITCOIN,
        icon: faBitcoin,
        style: "bitcoinIcon",
        styles: {
            color: "#F7931A",
        },
        title: "Add a Bitcoin Wallet",
        addressInput: "Wallet address (Begins with 1, 3, or bc1)",
        loadingTitle: "Adding Bitcoin Wallet",
        currencyTag: "BTC",
    },
    [CurrencyType.ETHEREUM]: {
        type: CurrencyType.ETHEREUM,
        icon: faEthereum,
        style: "ethereumIcon",
        styles: {
            color: "#3C3C3D",
        },
        title: "Add an Ethereum Wallet",
        addressInput: "Wallet address (Begins with 0x)",
        loadingTitle: "Adding Ethereum Wallet",
        currencyTag: "ETH",
    },
};

export const currenciesDisplayData: CurrencyDisplayData[] = [
    displayDataMap[CurrencyType.BITCOIN],
    displayDataMap[CurrencyType.ETHEREUM],
];
