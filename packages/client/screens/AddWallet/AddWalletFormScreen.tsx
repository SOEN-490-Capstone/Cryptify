import React from "react";
import { View } from "../../components/Themed";
import {TitleText} from "../../components/TitleText";
import {StyleSheet} from "react-native";
import {Center, Container, VStack, Text, HStack} from "native-base";
import {faEyeCustom} from "../../components/icons/faEyeCustom";
import {faEyeSlashCustom} from "../../components/icons/faEyeSlashCustom";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBitcoinCustom} from "../../components/icons/faBitcoinCustom";
import {faChevronRightCustom} from "../../components/icons/faChevronRightCustom";
import {faEthereumCustom} from "../../components/icons/faEthereumCustom";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export default function AddWalletFormScreen() {
    return <View style={styles.view}>
        <TitleText>Add a BitWallet</TitleText>
    </View>;
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
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
