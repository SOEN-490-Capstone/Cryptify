import { View } from "../../components/Themed";
import React from "react";
import { Button, VStack } from "native-base";
import { Alert, StyleSheet } from "react-native";
import { SettingsStackScreenProps } from "../../types";
import MultiLineListItem from "../../components/list/MultiLineListItem";
import { AuthContext } from "../../components/contexts/AuthContext";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { UsersGateway } from "../../gateways/users_gateway";
import StorageService from "../../services/storage_service";
import { KEY_JWT } from "../../constants/storage_keys";
import { User } from "@cryptify/common/src/domain/entities/user";

export default function AccountScreen({ navigation }: SettingsStackScreenProps<"AccountScreen">) {
    const usersGateway = new UsersGateway();

    const { token, setToken, user, setUser } = React.useContext(AuthContext);

    function handleDelete() {
        const callback = async () => {
            await usersGateway.deleteUser({ id: user.id }, token);
            await StorageService.remove(KEY_JWT);
            setToken("");
            setUser({} as User);
        };

        Alert.alert("Do you want to delete your account?", "You cannot undo this action.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: callback,
            },
        ]);
    }

    return (
        <View style={styles.view}>
            <VStack space="20px" flex={1}>
                <MultiLineListItem label={"Name"} value={`${user.firstName} ${user.lastName}`} />
                <MultiLineListItem
                    label={"Account Type"}
                    value={titleCase(user.role)}
                    inlineLink={() => navigation.navigate("AccountTypeScreen")}
                />
                <Button
                    variant="outline"
                    _text={{ color: "error.500" }}
                    onPress={handleDelete}
                    mt="10px"
                    testID="deleteAccountButton"
                >
                    Delete account
                </Button>
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
