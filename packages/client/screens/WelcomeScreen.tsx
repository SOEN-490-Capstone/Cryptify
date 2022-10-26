import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { View } from "../components/Themed";
import React from "react";
import StorageService from "../services/storage_service";
import { Button, Text } from "native-base";
import {GuestStackScreenProps, HomeStackScreenProps} from "../types";
import { useIsFocused } from "@react-navigation/native";
import { KEY_JWT } from "../constants/storage_keys";

export default function WelcomeScreen({ navigation }: GuestStackScreenProps<"WelcomeScreen">) {
    return (
        <View>
            <Text>Welcome</Text>
            <Button onPress={() => navigation.navigate("SignUpScreen")}>Sign up</Button>
            <Button onPress={() => navigation.navigate("SignInScreen")}>Sign in</Button>
        </View>
    );
}
