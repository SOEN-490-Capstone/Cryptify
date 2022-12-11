import { View } from "../components/Themed";
import React from "react";
import { StyleSheet, Switch } from "react-native";
import { AuthContext } from "../components/contexts/AuthContext";
import { UsersGateway } from "../gateways/users_gateway";
import { HStack, VStack, Text } from "native-base";
import { falArrowRightArrowLeft } from "../components/icons/light/falArrowRightArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function NotificationsScreen() {
    const { token, user, setUser } = React.useContext(AuthContext);
    const usersGateway = new UsersGateway();

    const [isEnabled, setIsEnabled] = React.useState(user.areNotificationsEnabled);
    async function toggleSwitch() {
        usersGateway.update(
            {
                userId: user.id,
                areNotificationsEnabled: !isEnabled,
            },
            token,
        );

        user.areNotificationsEnabled = !isEnabled;
        setUser(user);

        setIsEnabled(!isEnabled);
    }

    return (
        <View style={styles.view}>
            <HStack alignItems={"center"} space={"lg"}>
                <FontAwesomeIcon icon={falArrowRightArrowLeft} size={26} />
                <VStack>
                    <Text>Trasactions</Text>
                    <Text color="text.500" size={"footnote1"}>
                        Send and receive transactions for all wallets
                    </Text>
                </VStack>
                <Switch
                    trackColor={{ false: "#787880", true: "#0077E6" }}
                    thumbColor={"#FFFFFF"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </HStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 30,
    },
});
