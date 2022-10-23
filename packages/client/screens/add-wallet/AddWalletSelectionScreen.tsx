import React from "react";
import { View } from "../../components/Themed";
import { TitleText } from "../../components/TitleText";
import { StyleSheet } from "react-native";
import { VStack, Text, HStack, Pressable } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRightCustom } from "../../components/icons/faChevronRightCustom";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../../types";
import { CompositeScreenProps } from "@react-navigation/native";
import { currenciesDisplayData } from "../../constants/CurrenciesDisplayData";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"AddWalletSelectionScreen">,
    SettingsStackScreenProps<"AddWalletSelectionScreen">
>;

export default function AddWalletSelectionScreen({ navigation }: Props) {
    return (
        <View style={styles.view}>
            <TitleText>Add a Wallet</TitleText>
            <VStack style={styles.currencyTypeStack} space="2px">
                {currenciesDisplayData.map((currency, i) => (
                    <Pressable
                        onPress={() => navigation.navigate("AddWalletScreen", { currencyType: currency.type })}
                        key={i}
                        style={styles.currencyTypeItem}
                        _pressed={{
                            background: "text.200",
                        }}
                    >
                        <HStack height="50px" alignItems="center">
                            <FontAwesomeIcon icon={currency.icon} style={styles[currency.style]} size={26} />
                            <Text style={styles.currencyTypeText}>{titleCase(currency.type)}</Text>
                            <FontAwesomeIcon icon={faChevronRightCustom} style={styles.chevronRightIcon} size={16} />
                        </HStack>
                    </Pressable>
                ))}
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    currencyTypeStack: {
        marginTop: 20,
    },
    currencyTypeItem: {
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    currencyTypeText: {
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
