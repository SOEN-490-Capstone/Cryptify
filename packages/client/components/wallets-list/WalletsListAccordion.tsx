import React from "react";
import { Pressable, Box, HStack, Text, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farChevronRight } from "../icons/regular/farChevronRight";
import { farChevronDown } from "../icons/regular/farChevronDown";
import { StyleSheet } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { currenciesDisplayData, CurrencyDisplayData } from "../../constants/CurrenciesDisplayData";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { getWalletsTotal } from "../../services/currency_service";
import { getFormattedAmount } from "@cryptify/common/src/utils/currency_utils";
import { CurrencyAmount } from "../CurrencyAmount";
import { CompositeNavigationProp } from "@react-navigation/native";
import { formatAddress } from "@cryptify/common/src/utils/address_utils";

type Props = {
    wallets: WalletWithBalance[];
    showCurrencyTotals: boolean;
    navigation: CompositeNavigationProp<any, any>;
    isSettingsTab: boolean;
};

export function WalletsListAccordion({ wallets, showCurrencyTotals, navigation, isSettingsTab }: Props) {
    const walletsByType = {
        [CurrencyType.BITCOIN]: wallets.filter((wallet) => wallet.currencyType == CurrencyType.BITCOIN),
        [CurrencyType.ETHEREUM]: wallets.filter((wallet) => wallet.currencyType == CurrencyType.ETHEREUM),
    };

    const [activeSections, setActiveSections] = React.useState({
        [CurrencyType.BITCOIN]: [],
        [CurrencyType.ETHEREUM]: [],
    });

    function formatTitle(currencyType: CurrencyType, address: string): string {
        return `${titleCase(currencyType)} ${formatAddress(address)}`;
    }

    function renderHeader(currency: CurrencyDisplayData, _: number, isActive: boolean) {
        const amount = getWalletsTotal(wallets, currency.type);
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
                testID={`walletsList${currency.type}`}
            >
                <FontAwesomeIcon icon={currency.icon} style={styles[currency.style]} size={26} />
                <Text fontWeight={"semibold"} style={styles.headerText}>
                    {titleCase(currency.type)}
                </Text>
                {showCurrencyTotals ? (
                    <CurrencyAmount
                        currency={currency}
                        amount={amount}
                        fontWeight={"semibold"}
                        currencyCodeStyles={styles.walletTotalCurrencyCode}
                    />
                ) : (
                    <Box flex={1}></Box>
                )}
                <FontAwesomeIcon
                    icon={isActive ? farChevronDown : farChevronRight}
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
                    <Pressable
                        key={i}
                        style={{
                            ...styles.walletItemWrapper,
                            borderBottomLeftRadius: i === walletsByType[currency.type].length - 1 ? 10 : 0,
                            borderBottomRightRadius: i === walletsByType[currency.type].length - 1 ? 10 : 0,
                            borderBottomWidth: i === walletsByType[currency.type].length - 1 ? 1 : 0,
                        }}
                        testID={`walletsListItem${currency.type}`}
                        onPress={() => {
                            isSettingsTab
                                ? navigation.navigate("WalletSettingsScreen", {
                                      title: formatTitle(wallet.currencyType, wallet.address),
                                      wallet,
                                  })
                                : navigation.navigate("WalletOverviewScreen", {
                                      title: formatTitle(wallet.currencyType, wallet.address),
                                      wallet,
                                  });
                        }}
                    >
                        <HStack style={styles.walletItem} alignItems="center" space="5px">
                            <VStack space="2px">
                                <Text>{wallet.name}</Text>
                                <Text size={"footnote2"} color={"text.400"}>
                                    {formatAddress(wallet.address)}
                                </Text>
                            </VStack>
                            <CurrencyAmount
                                currency={currency}
                                amount={wallet.balance}
                                amountStyles={styles.walletBalance}
                                currencyCodeStyles={styles.walletBalance}
                            />
                        </HStack>
                    </Pressable>
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
        marginHorizontal: 10,
    },
    walletTotalCurrencyCode: {
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
    walletBalance: {
        marginLeft: "auto",
    },
});
