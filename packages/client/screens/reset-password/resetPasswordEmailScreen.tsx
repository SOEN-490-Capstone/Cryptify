import React from "react";
import { View } from "../../components/Themed";
import { Button, FormControl, Input, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import { ERROR_NOP } from "@cryptify/common/src/errors/error_messages";
import { resetPasswordEmailSchema } from "@cryptify/common/src/validations/reset_password_email_schema";

export default function ResetPasswordEmailScreen() {

    function onSubmitResetPassword(){

    }

    const initialValues = {
        email: ""
    }

    return (
        <View style={styles.container}>
            <Text size={"title3"} fontWeight={"semibold"}>
                Reset your password
            </Text>

            <Text>Enter the email address associated with your account and we'll send you instructions to reset your password.</Text>
            <Formik initialValues={initialValues} validationSchema={resetPasswordEmailSchema} onSubmit={onSubmitResetPassword}>
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space="13" style={{ marginHorizontal: 20, marginTop: 35 }}>
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
                            Sign in
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
