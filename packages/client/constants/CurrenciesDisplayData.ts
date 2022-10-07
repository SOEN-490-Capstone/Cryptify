import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { faBitcoinCustom } from "../components/icons/faBitcoinCustom";
import { faEthereumCustom } from "../components/icons/faEthereumCustom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type CurrencyDisplayData = {
    type: CurrencyType;
    icon: IconDefinition;
    style: "bitcoinIcon" | "ethereumIcon";
    title: string;
    addressInput: string;
};

export const currenciesDisplayData: CurrencyDisplayData[] = [
    {
        type: CurrencyType.BITCOIN,
        icon: faBitcoinCustom,
        style: "bitcoinIcon",
        title: "Add a Bitcoin Wallet",
        addressInput: "Wallet address (Begins with 1, 3, or bc1)",
    },
    {
        type: CurrencyType.ETHEREUM,
        icon: faEthereumCustom,
        style: "ethereumIcon",
        title: "Add an Ethereum Wallet",
        addressInput: "Wallet address (Begins with 0x)",
    },
];
