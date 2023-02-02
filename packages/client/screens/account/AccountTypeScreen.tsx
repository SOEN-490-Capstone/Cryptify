import { View } from "../../components/Themed";
import React from "react";
import { Box, Button, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import LargeIconMultiLineListItem from "../../components/list/LargeIconMultiLineListItem";
import { falArrowRightArrowLeft } from "../../components/icons/light/falArrowRightArrowLeft";
import { falSparkles } from "../../components/icons/light/falSparkles";
import { AuthContext } from "../../components/contexts/AuthContext";
import { Role } from "@cryptify/common/src/domain/role";
import { UsersGateway } from "../../gateways/users_gateway";

export default function AccountTypeScreen() {
    const usersGateway = new UsersGateway();

    const { token, user, setUser } = React.useContext(AuthContext);
    const [role, setRole] = React.useState(user.role);

    async function onSubmit() {
        const oldRole = role;
        const newRole = role === Role.BASIC ? Role.PRO : Role.BASIC;

        try {
            setRole(newRole);
            setUser({
                ...user,
                role: newRole,
            });

            await usersGateway.update(
                {
                    userId: user.id,
                    role: newRole,
                },
                token,
            );
        } catch (e) {
            // If there is an API error make sure to revert any frontend state changes to keep things in sync
            setRole(oldRole);
            setUser({
                ...user,
                role: oldRole,
            });
        }
    }

    const buttonText = role === Role.BASIC ? "Enable Pro" : "Disable Pro";

    return (
        <View style={styles.view}>
            <Text size={"title1"} fontWeight={"semibold"}>
                Cryptify Pro
            </Text>
            <Box marginTop="20px"></Box>
            <Text>
                Cryptify Pro offers exclusive features, like detailed transaction information, early access to select
                features, and more.
            </Text>
            <Box marginTop="30px"></Box>
            <VStack space="15px">
                <LargeIconMultiLineListItem
                    label={"See more transaction details"}
                    value={"See more detailed information available on the blockchain for each of your transaction"}
                    icon={falArrowRightArrowLeft}
                />
                <LargeIconMultiLineListItem
                    label={"Get early access"}
                    value={"Get early access to select new features"}
                    icon={falSparkles}
                />
            </VStack>
            <Button style={styles.addContactButton} onPress={onSubmit} testID="updateAccountTypeButton">
                {buttonText}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    addContactButton: {
        marginTop: "auto",
        marginBottom: 15,
    },
});
