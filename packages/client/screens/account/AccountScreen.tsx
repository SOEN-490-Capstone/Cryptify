import { View } from "../../components/Themed";
import React from "react";
import { Button, HStack, VStack, Text } from "native-base";
import { Alert, Pressable, StyleSheet } from "react-native";
import { SettingsStackScreenProps } from "../../types";
import MultiLineListItem from "../../components/list/MultiLineListItem";
import { AuthContext } from "../../components/contexts/AuthContext";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { UsersGateway } from "../../gateways/users_gateway";
import StorageService from "../../services/storage_service";
import { KEY_JWT } from "../../constants/storage_keys";
import { User } from "@cryptify/common/src/domain/entities/user";
import { farChevronRight } from "../../components/icons/regular/farChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

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
                <MultiLineListItem
                    label={"Name"}
                    value={`${user.firstName} ${user.lastName}`}
                    inlineLink={() => navigation.navigate("AccountNameScreen")}
                />
                <MultiLineListItem
                    label={"Email"}
                    value={`${user.email}`}
                    inlineLink={() => navigation.navigate("AccountEmailScreen")}
                />
                <MultiLineListItem
                    label={"Account Type"}
                    value={titleCase(user.role)}
                    inlineLink={() => navigation.navigate("AccountTypeScreen")}
                />
                <Pressable onPress={() => navigation.navigate("AccountPasswordScreen")}>
                    <HStack alignItems="center">
                        <Text>Change Password</Text>
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                </Pressable>
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
    chevronRightIcon: {
        color: "#A3A3A3",
        marginLeft: "auto",
    },
});
