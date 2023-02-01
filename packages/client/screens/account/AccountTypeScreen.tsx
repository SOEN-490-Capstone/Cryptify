import { View } from "../../components/Themed";
import React from "react";
import { VStack } from "native-base";
import { StyleSheet } from "react-native";
import { SettingsStackScreenProps } from "../../types";

export default function AccountTypeScreen({ navigation }: SettingsStackScreenProps<"AccountTypeScreen">) {
    return (
        <View style={styles.view}>
            <VStack space="15px" flex={1}></VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
});
