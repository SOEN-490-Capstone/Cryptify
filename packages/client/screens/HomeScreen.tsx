import { View } from "../components/Themed";
import React from "react";
import { HStack, Pressable, Text, VStack } from "native-base";
import { HomeStackScreenProps } from "../types";
import WalletsList from "../components/wallets-list/WalletsList";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fasCirclePlusSolid } from "../components/icons/solid/fasCirclePlusSolid";
import { AuthContext } from "../components/contexts/AuthContext";

export default function HomeScreen({ navigation }: HomeStackScreenProps<"HomeScreen">) {
    const { user } = React.useContext(AuthContext);

    return (
        <View style={styles.view}>
            <HStack flexWrap={"wrap"}>
                <Text size={"title1"}>Hello, </Text>
                <Text size={"title1"} fontWeight={"semibold"} textTransform={"capitalize"}>
                    {user.firstName}
                </Text>
            </HStack>
            <VStack space="15px" flex={1} marginTop="30px">
                <HStack justifyContent="space-between" alignItems="center">
                    <Text size={"title3"} fontWeight={"semibold"}>
                        Wallets
                    </Text>
                    <Pressable onPress={() => navigation.navigate("AddWalletSelectionScreen")} testID="addWalletButton">
                        <FontAwesomeIcon icon={fasCirclePlusSolid} style={styles.addWalletIcon} size={22} />
                    </Pressable>
                </HStack>
                <WalletsList navigation={navigation} showCurrencyTotals={true} isSettingsTab={false} />
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 40,
    },
    addWalletIcon: {
        color: "#404040",
    },
});
