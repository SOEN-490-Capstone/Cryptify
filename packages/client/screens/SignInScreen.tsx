import React from "react";
import { StyleSheet } from "react-native";
import { Input, Button, VStack, FormControl, Pressable, Text, Box } from "native-base";
import { View } from "../components/Themed";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeCustom } from "../components/icons/faEyeCustom";
import { faEyeSlashCustom } from "../components/icons/faEyeSlashCustom";
import { AuthGateway } from "../gateways/auth_gateway";
import StorageService from "../services/storage_service";
import { RootTabScreenProps } from "../types";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";
import { signInSchema } from "@cryptify/common/src/validations/sign_in_schema";
import { KEY_JWT } from "../constants/storage_keys";
import { FormikHelpers } from "formik/dist/types";
import { ERROR_NOP } from "@cryptify/common/src/errors/error_messages";

export default function SignInScreen({ navigation }: RootTabScreenProps<"SignInScreen">) {
    const authGateway = new AuthGateway();
    const [showPassword, setShowPass] = React.useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    async function onSubmitSignIn(values: SignInRequest, formikHelpers: FormikHelpers<SignInRequest>): Promise<void> {
        try {
            const token = await authGateway.signIn(values);
            StorageService.put(KEY_JWT, token);

            navigation.reset({
                index: 0,
                routes: [{ name: "HomeStack" }],
            });
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("email", ERROR_NOP);
                formikHelpers.setFieldError("password", error.message);
            }
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Box safeArea>
                <Text style={styles.title}>Welcome back</Text>
            </Box>
            <Formik initialValues={initialValues} validationSchema={signInSchema} onSubmit={onSubmitSignIn}>
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space="13" style={{ marginHorizontal: 20, marginTop: 35 }}>
                        <FormControl isInvalid={!!(errors.email && touched.email)}>
                            <Input value={values.email} onChangeText={handleChange("email")} placeholder="Email" />
                            <FormControl.ErrorMessage>
                                {errors.email != ERROR_NOP && errors.email}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!(errors.password && touched.password)}>
                            <Input
                                value={values.password}
                                type={showPassword ? "text" : "password"}
                                InputRightElement={
                                    <Pressable onPress={() => setShowPass(!showPassword)}>
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeCustom : faEyeSlashCustom}
                                            style={styles.eyeIcon}
                                            size={20}
                                        />
                                    </Pressable>
                                }
                                onChangeText={handleChange("password")}
                                placeholder="Password"
                            />
                            <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
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
    title: {
        fontSize: 28,
        lineHeight: 32,
        fontWeight: "bold",
        textAlign: "center",
    },
    eyeIcon: {
        color: "#404040",
        marginRight: 12,
    },
});
