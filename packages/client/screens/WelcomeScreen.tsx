import { View } from "../components/Themed";
import React from "react";
import { Button, Text } from "native-base";
import { GuestStackScreenProps } from "../types";

export default function WelcomeScreen({ navigation }: GuestStackScreenProps<"WelcomeScreen">) {
    return (
        <View>
            <Text>Welcome</Text>
            <Button onPress={() => navigation.navigate("SignUpScreen")}>Sign up</Button>
            <Button onPress={() => navigation.navigate("SignInScreen")}>Sign in</Button>
        </View>
    );
}
