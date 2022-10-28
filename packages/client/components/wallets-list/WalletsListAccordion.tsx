import React from "react";
import {Box, HStack, Text, VStack} from "native-base";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronRightCustom} from "../icons/faChevronRightCustom";
import {faChevronDownCustom} from "../icons/faChevronDownCustom";
import {StyleSheet} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import {WalletWithBalance} from "@cryptify/common/src/domain/wallet_with_balance";
import {CurrencyType} from "@cryptify/common/src/domain/currency_type";
import {currenciesDisplayData, CurrencyDisplayData} from "../../constants/CurrenciesDisplayData";
import {titleCase} from "@cryptify/common/src/utils/string_utils";
import { getWalletsTotal} from "../../services/currency_service";
import {CurrencyAmount} from "../CurrencyAmount";

type Props = {
    wallets: WalletWithBalance[];
    showCurrencyTotals: boolean;
};

export function WalletsListAccordion({ wallets, showCurrencyTotals }: Props) {
    const walletsByType = {
        [CurrencyType.BITCOIN]: wallets.filter((wallet) => wallet.currencyType == CurrencyType.BITCOIN),
        [CurrencyType.ETHEREUM]: wallets.filter((wallet) => wallet.currencyType == CurrencyType.ETHEREUM),
    };

    const [activeSections, setActiveSections] = React.useState({
        [CurrencyType.BITCOIN]: [],
        [CurrencyType.ETHEREUM]: [],
    });

    function formatWalletAddress(address: string): string {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
    }

    function renderHeader(currency: CurrencyDisplayData, _: number, isActive: boolean) {
        const amount = getWalletsTotal(wallets);
        return (
            <HStack
                height="66px"
                alignItems="center"
                style={{
                    ...styles.header,
                    borderBottomRightRadius: isActive ? 0 : 10,
                    borderBottomLeftRadius: isActive ? 0 : 10,
                    borderBottomWidth: isActive ? 0 : 1,
                }}
            >
                <FontAwesomeIcon icon={currency.icon} style={styles[currency.style]} size={26} />
                <Text style={styles.headerText}>{titleCase(currency.type)}</Text>
                {showCurrencyTotals ? <CurrencyAmount currency={currency} amount={amount} totalStyles={styles.walletTotal} currencyCodeStyles={styles.walletTotalCurrencyCode}/> : <Box flex={1}></Box>}
                <FontAwesomeIcon
                    icon={isActive ? faChevronDownCustom : faChevronRightCustom}
                    style={styles.chevronIcon}
                    size={16}
                />
            </HStack>
        );
    }

    function renderContent(currency: CurrencyDisplayData) {
        return (
            <>
                {walletsByType[currency.type].map((wallet, i) => (
                    <Box
                        key={i}
                        style={{
                            ...styles.walletItemWrapper,
                            borderBottomLeftRadius: i === walletsByType[currency.type].length - 1 ? 10 : 0,
                            borderBottomRightRadius: i === walletsByType[currency.type].length - 1 ? 10 : 0,
                            borderBottomWidth: i === walletsByType[currency.type].length - 1 ? 1 : 0,
                        }}
                    >
                        <HStack style={styles.walletItem} alignItems="center" space="5px">
                            <VStack>
                                <Text style={styles.walletName}>{wallet.name}</Text>
                                <Box marginTop="2px"></Box>
                                <Text style={styles.walletAddress}>{formatWalletAddress(wallet.address)}</Text>
                            </VStack>
                            <CurrencyAmount currency={currency} amount={wallet.balance} totalStyles={styles.walletBalance} currencyCodeStyles={styles.walletBalance}/>
                        </HStack>
                    </Box>
                ))}
            </>
        );
    }

    return (
        <>
            {currenciesDisplayData.map(
                (currency, i) =>
                    walletsByType[currency.type].length > 0 && (
                        <Box key={i}>
                            <Accordion
                                sections={[currency]}
                                activeSections={activeSections[currency.type]}
                                renderHeader={renderHeader}
                                renderContent={renderContent}
                                onChange={(activeSections) =>
                                    setActiveSections((curr) => ({
                                        ...curr,
                                        [currency.type]: activeSections,
                                    }))
                                }
                                underlayColor="#E5E5E5"
                            />
                            <Box marginTop="15px"></Box>
                        </Box>
                    ),
            )}
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        padding: 15,
    },
    headerText: {
        fontSize: 17,
        lineHeight: 23,
        fontWeight: "600",
        marginHorizontal: 10,
    },
    walletTotal: {
        fontSize: 17,
        lineHeight: 23,
        fontWeight: "600",
    },
    walletTotalCurrencyCode: {
        fontSize: 17,
        lineHeight: 23,
        fontWeight: "600",
        marginRight: 5,
    },
    bitcoinIcon: {
        color: "#F7931A",
    },
    ethereumIcon: {
        color: "#3C3C3D",
    },
    chevronIcon: {
        color: "#A3A3A3",
    },
    walletItemWrapper: {
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: 15,
    },
    walletItem: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: "#E5E5E5",
    },
    walletName: {
        fontSize: 17,
        lineHeight: 23,
    },
    walletAddress: {
        fontSize: 13,
        lineHeight: 17,
        color: "#A3A3A3",
    },
    walletBalance: {
        fontSize: 17,
        lineHeight: 23,
        marginLeft: "auto",
    },
});
