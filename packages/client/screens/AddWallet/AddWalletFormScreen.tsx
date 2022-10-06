import React from "react";
import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { faBitcoinCustom } from "../../components/icons/faBitcoinCustom";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../../types";
import { titleCase } from "@cryptify/common/src/helpers/string_utils";
import { CompositeScreenProps } from "@react-navigation/native";
import { TitleTextWithIcon } from "../../components/TitleTextWithIcon";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"AddWalletFormScreen">,
    SettingsStackScreenProps<"AddWalletFormScreen">
>;

export default function AddWalletFormScreen({ route }: Props) {
    const title = `Add a ${titleCase(route.params.currencyType)} Wallet`;

    return (
        <View style={styles.view}>
            <TitleTextWithIcon
                icon={faBitcoinCustom}
                iconSize={64}
                iconStyles={styles.bitcoinIcon}
                textStyles={styles.title}
            >
                {title}
            </TitleTextWithIcon>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        lineHeight: 27,
        marginTop: 12,
    },
    bitcoinIcon: {
        color: "#F7931A",
    },
    ethereumIcon: {
        color: "#3C3C3D",
    },
});
