import { View } from "../../components/Themed";
import React from "react";
import { VStack } from "native-base";
import { StyleSheet } from "react-native";
import { SettingsStackScreenProps } from "../../types";
import MultiLineListItem from "../../components/list/MultiLineListItem";
import { AuthContext } from "../../components/contexts/AuthContext";
import { titleCase } from "@cryptify/common/src/utils/string_utils";

export default function AccountScreen({ navigation }: SettingsStackScreenProps<"AccountScreen">) {
    const { user } = React.useContext(AuthContext);

    return (
        <View style={styles.view}>
            <VStack space="15px" flex={1}>
                <MultiLineListItem label={"Name"} value={`${user.firstName} ${user.lastName}`} />
                <MultiLineListItem
                    label={"Account Type"}
                    value={titleCase(user.role)}
                    inlineLink={() => navigation.navigate("AccountTypeScreen")}
                />
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
});
