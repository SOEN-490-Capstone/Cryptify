import React from "react";
import { View } from "../../components/Themed";
import {TitleText} from "../../components/TitleText";
import {StyleSheet} from "react-native";
import {Center, Container, VStack, Text, HStack, Pressable} from "native-base";
import {faEyeCustom} from "../../components/icons/faEyeCustom";
import {faEyeSlashCustom} from "../../components/icons/faEyeSlashCustom";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBitcoinCustom} from "../../components/icons/faBitcoinCustom";
import {faChevronRightCustom} from "../../components/icons/faChevronRightCustom";
import {faEthereumCustom} from "../../components/icons/faEthereumCustom";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {CurrencyType} from "@cryptify/common/src/domain/currency_type";
import {titleCase} from "@cryptify/common/src/helpers/string_utils";
import {HomeStackScreenProps, SettingsStackScreenProps} from "../../types";
import {CompositeScreenProps} from "@react-navigation/native";

type CryptoCurrencies = {
    name: CurrencyType;
    icon: IconDefinition,
    style: "bitcoinIcon" | "ethereumIcon"
}

type Props = CompositeScreenProps<HomeStackScreenProps<"AddWalletScreen">, SettingsStackScreenProps<"AddWalletScreen">>;

export default function AddWalletScreen({ navigation }: Props) {
    const cryptoCurrencies: CryptoCurrencies[] = [
        {
            name: CurrencyType.BITCOIN,
            icon: faBitcoinCustom,
            style: "bitcoinIcon",
        },
        {
            name: CurrencyType.ETHEREUM,
            icon: faEthereumCustom,
            style: "ethereumIcon",
        }
    ]

    return <View style={styles.view}>
        <TitleText>Add a Wallet</TitleText>
        <VStack style={styles.currencyTypeStack}>
            {cryptoCurrencies.map((currency, i) => (
                <Pressable onPress={() => navigation.navigate("AddWalletFormScreen", { currencyType: currency.name })} key={i}>
                    <HStack height="50" alignItems="center">
                        <FontAwesomeIcon
                            icon={currency.icon}
                            style={styles[currency.style]}
                            size={26}
                        />
                        <Text style={styles.currencyTypeText}>
                            {titleCase(currency.name)}
                        </Text>
                        <FontAwesomeIcon
                            icon={faChevronRightCustom}
                            style={styles.chevronRightIcon}
                            size={16}
                        />
                    </HStack>
                </Pressable>
            ))}
        </VStack>
    </View>;
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    currencyTypeStack: {
        marginHorizontal: 10,
        marginTop: 20,
    },
    currencyTypeText: {
        color: "#404040",
        fontWeight: "400",
        fontSize: 17,
        lineHeight: 23,
        marginLeft: 15,
    },
    bitcoinIcon: {
        color: "#F7931A",
    },
    ethereumIcon: {
        color: "#3C3C3D",
    },
    chevronRightIcon: {
        color: "#A3A3A3",
        marginLeft: "auto",
        marginRight: 5,
    },
});
