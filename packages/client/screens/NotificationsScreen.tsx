import { View } from "../components/Themed";
import React from "react";
import { StyleSheet, Switch } from "react-native";
import { AuthContext } from "../components/contexts/AuthContext";
import { UsersGateway } from "../gateways/users_gateway";
import { HStack, VStack, Text } from "native-base";
import { farArrowRightArrowLeft } from "../components/icons/regular/farArrowRightArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function NotificationsScreen() {
    const { token, user } = React.useContext(AuthContext);
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
        setIsEnabled(!isEnabled);
    }

    return (
        <View style={styles.view}>
            <HStack alignItems={"center"} space={19}>
                <FontAwesomeIcon icon={farArrowRightArrowLeft} size={26} />
                <VStack style={{ maxWidth: 280, paddingRight: 75 }}>
                    <Text>Trasactions</Text>
                    <Text color="text.500" size={"footnote1"}>
                        Send and receive transactions for all wallets
                    </Text>
                </VStack>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
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
        paddingTop: 40,
    },
});
