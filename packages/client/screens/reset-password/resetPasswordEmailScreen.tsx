import React from "react";
import { View } from "../../components/Themed";
import { Button, Center, FormControl, Input, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import { ERROR_NOP } from "@cryptify/common/src/errors/error_messages";
import { forgotPasswordSchema } from "@cryptify/common/src/validations/forgot_password_schema";
import { ForgotPasswordRequest } from "@cryptify/common/src/requests/forgot_password_request";
import { AuthGateway } from "../../gateways/auth_gateway";
import { GuestStackScreenProps } from "../../types";
import { KEY_JWT } from "../../constants/storage_keys";
import StorageService from "../../services/storage_service";
import { AuthContext } from "../../components/contexts/AuthContext";

export default function ResetPasswordEmailScreen(navigation: GuestStackScreenProps<"ResetPasswordEmailScreen">) {
    const { setToken } = React.useContext(AuthContext);

    async function onSubmitResetPassword(values: ForgotPasswordRequest) {
        try {
            const gateway = new AuthGateway();
            await gateway.forgotPassword(values);
            await StorageService.remove(KEY_JWT);
            setToken("");
            navigation.navigation.navigate("ResetPasswordSuccessScreen");
        } catch (e) {
            navigation.navigation.navigate("ResetPasswordFailureScreen");
        }
    }

    const initialValues = {
        email: "",
    };

    return (
        <View style={styles.view}>
            <VStack space={"20px"}>
                <Text textAlign={"center"} size={"title1"} fontWeight={"semibold"}>
                    Reset your password
                </Text>

                <Text textAlign={"center"} size={"callout"}>
                    Enter the email address associated with your account and we'll send you instructions to reset your
                    password.
                </Text>
            </VStack>
            <Formik
                initialValues={initialValues}
                validationSchema={forgotPasswordSchema}
                onSubmit={onSubmitResetPassword}
            >
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space={"20px"} marginTop={"35px"}>
                        <FormControl isInvalid={!!(errors.email && touched.email)}>
                            <Input
                                value={values.email}
                                onChangeText={handleChange("email")}
                                placeholder="Email"
                                testID="email"
                            />
                            <FormControl.ErrorMessage>
                                {errors.email != ERROR_NOP && errors.email}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <Button
                            onPress={submitForm}
                            isDisabled={!!(values?.email.length === 0)}
                        >
                            Send instructions
                        </Button>
                    </VStack>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 15,
    },
});
