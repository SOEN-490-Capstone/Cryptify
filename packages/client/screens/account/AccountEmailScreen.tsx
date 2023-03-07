import { View } from "../../components/Themed";
import React from "react";
import { StyleSheet } from "react-native";
import { SettingsStackScreenProps } from "../../types";
import { AuthContext } from "../../components/contexts/AuthContext";
import { UsersGateway } from "../../gateways/users_gateway";

export default function AccountEmailScreen({ navigation }: SettingsStackScreenProps<"AccountEmailScreen">) {
    const usersGateway = new UsersGateway();

    const { token, setToken, user, setUser } = React.useContext(AuthContext);

    function handleUpdate() {}

    return <View style={styles.view}></View>;
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
});
