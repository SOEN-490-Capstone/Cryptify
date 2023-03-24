import React from "react";
import { View } from "../components/Themed";
import { Center, Text, Button, Link, VStack } from "native-base";
import { Alert, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falBell } from "../components/icons/light/falBell";
import { AuthContext } from "../components/contexts/AuthContext";
import { GuestStackScreenProps } from "../types";
import { UsersGateway } from "../gateways/users_gateway";
import StorageService from "../services/storage_service";
import { KEY_JWT } from "../constants/storage_keys";

export default function SignUpNotificationsScreen(props: GuestStackScreenProps<"SignUpNotificationsScreen">) {
    const usersGateway = new UsersGateway();
    const { setToken, setUser } = React.useContext(AuthContext);

    async function submitNotification(enableNotification: boolean): Promise<void> {
        if (enableNotification) {
            await AsyncAlert();
        }
        setToken(props.route.params.token.accessToken);
        StorageService.put(KEY_JWT, props.route.params.token);
    }

    const AsyncAlert = async () =>
        new Promise((resolve) => {
            Alert.alert(
                "“Cryptify” Would Like to Send You Notifications",
                "Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                        onPress: () => {
                            setToken(props.route.params.token.accessToken);
                            StorageService.put(KEY_JWT, props.route.params.token);
                            resolve("YES");
                        },
                    },
                    {
                        text: "Allow",
                        onPress: () => {
                            props.route.params.user.areNotificationsEnabled = true;
                            usersGateway.update(
                                {
                                    userId: props.route.params.user.id,
                                    areNotificationsEnabled: true,
                                },
                                props.route.params.token.accessToken,
                            );

                            props.route.params.user.areNotificationsEnabled = true;
                            setUser(props.route.params.user);
                            resolve("YES");
                        },
                    },
                ],
            );
        });

    return (
        <View style={styles.view}>
            <Center alignItems="center" marginY="auto">
                <FontAwesomeIcon icon={falBell} style={styles.bellIcon} color={"#0077E6"} size={96} />
                <Text size={"title3"} fontWeight={"semibold"} marginBottom="15px" marginTop="30px">
                    Enable Notifications
                </Text>
                <Text textAlign={"center"}>
                    We’ll send you notifications to keep you up to date with your crypto assets.
                </Text>
            </Center>
            <Center style={{ flex: 1 }}></Center>
            <VStack space={"20px"} marginBottom="20px">
                <Button onPress={() => submitNotification(true)} testID="enableNotificationsSubmit">
                    Enable notifications
                </Button>
                <Center>
                    <Link
                        _text={{
                            color: "darkBlue.500",
                            fontWeight: "semibold",
                        }}
                        isUnderlined={false}
                        onPress={() => submitNotification(false)}
                        testID="disableNotificationsSubmit"
                    >
                        Not now
                    </Link>
                </Center>
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
    },
    bellIcon: {
        marginTop: 80,
    },
});
