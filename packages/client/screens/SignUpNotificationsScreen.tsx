import React from "react";
import { View } from "../components/Themed";
import { Center, Text, Button } from "native-base";
import { Alert, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farBell } from "../components/icons/regular/farBell";
import { AuthContext } from "../components/contexts/AuthContext";
import { GuestStackScreenProps } from "../types";
import { AuthGateway } from "../gateways/auth_gateway";
import { UsersGateway } from "../gateways/users_gateway";
import StorageService from "../services/storage_service";
import { KEY_JWT } from "../constants/storage_keys";

export default function SignUpNotificationsScreen(props: GuestStackScreenProps<"SignUpNotificationsScreen">) {
    const authGateway = new AuthGateway();
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
            <Center alignItems="center" marginY="auto" marginLeft={44} marginRight={44}>
                <FontAwesomeIcon icon={farBell} style={styles.bellIcon} size={96} />
                <Text size={"title3"} fontWeight={"semibold"} marginBottom={15}>
                    Enable Notifications.
                </Text>
                <Text>We'll send you notifications to keep you up to date with your crypto assets.</Text>
            </Center>
            <Button onPress={() => submitNotification(true)}>Enable notifications</Button>
            <Button style={styles.notNowButton} onPress={() => submitNotification(false)}>
                <Text color={"darkBlue.500"}>Not Now</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 15,
    },
    bellIcon: {
        marginVertical: 30,
        marginRight: 10,
        // darkBlue.500
        color: "#0077E6",
    },
    notNowButton: {
        marginVertical: 20,
        backgroundColor: "white",
    },
});
