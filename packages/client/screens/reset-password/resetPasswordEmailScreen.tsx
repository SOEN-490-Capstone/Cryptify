import React from "react";
import { View } from "../../components/Themed";
import { Button, FormControl, Input, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import { ERROR_NOP } from "@cryptify/common/src/errors/error_messages";
import { forgotPasswordSchema } from "@cryptify/common/src/validations/forgot_password_schema";
import { ForgotPasswordRequest } from "@cryptify/common/src/requests/forgot_password_request";
import { AuthGateway } from "../../gateways/auth_gateway";
import { GuestStackScreenProps } from "../../types";


export default function ResetPasswordEmailScreen(navigation: GuestStackScreenProps<"ResetPasswordEmailScreen">) {
    async function onSubmitResetPassword( values: ForgotPasswordRequest ) {

        try{
            const gateway = new AuthGateway();
            await gateway.forgotPassword(values);
            navigation.navigation.navigate("ResetPasswordSuccessScreen");
        }catch(e){
            navigation.navigation.navigate("ResetPasswordFailureScreen");
        }
    }

    const initialValues = {
        email: "",
    };

    return (
        <View style={styles.container}>
            <Text size={"title1"} fontWeight={"semibold"}>
                Reset your password
            </Text>

            <Text style={{marginVertical: 20}}>
                Enter the email address associated with your account and we'll send you instructions to reset your
                password.
            </Text>
            <Formik
                initialValues={initialValues}
                validationSchema={forgotPasswordSchema}
                onSubmit={onSubmitResetPassword}
            >
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space="13" style={{ marginHorizontal: 0, marginTop: 10, width: "100%"}}>
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
                        <Button style={{ marginTop: 7 }} onPress={submitForm}>
                            Send instructions
                        </Button>
                    </VStack>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
});