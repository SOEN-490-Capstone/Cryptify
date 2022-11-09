import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { faBitcoin } from "../components/icons/brands/faBitcoin";
import { faEthereum } from "../components/icons/brands/faEthereum";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type CurrencyDisplayData = {
    type: CurrencyType;
    icon: IconDefinition;
    style: "bitcoinIcon" | "ethereumIcon";
    title: string;
    addressInput: string;
    loadingTitle: string;
    currencyTag: string;
};

export const currenciesDisplayData: CurrencyDisplayData[] = [
    {
        type: CurrencyType.BITCOIN,
        icon: faBitcoin,
        style: "bitcoinIcon",
        title: "Add a Bitcoin Wallet",
        addressInput: "Wallet address (Begins with 1, 3, or bc1)",
        loadingTitle: "Adding Bitcoin Wallet",
        currencyTag: "BTC",
    },
    {
        type: CurrencyType.ETHEREUM,
        icon: faEthereum,
        style: "ethereumIcon",
        title: "Add an Ethereum Wallet",
        addressInput: "Wallet address (Begins with 0x)",
        loadingTitle: "Adding Ethereum Wallet",
        currencyTag: "ETH",
    },
];
