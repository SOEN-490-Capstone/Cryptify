import React from "react";
import { View } from "../components/Themed";
import {TitleText} from "../components/TitleText";
import {StyleSheet} from "react-native";

export default function AddWalletScreen() {
    return <View style={styles.view}>
        <TitleText>Add a Wallet</TitleText>
    </View>;
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
    },
});
