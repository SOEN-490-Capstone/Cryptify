import React from "react";
import { StyleSheet } from "react-native";
import { Input, Button, VStack, FormControl, Pressable, HStack, Text } from "native-base";
import { View } from "../components/Themed";
import { Formik } from "formik";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeCustom } from "../components/icons/faEyeCustom";
import { faEyeSlashCustom } from "../components/icons/faEyeSlashCustom";
import { AuthGateway } from "../gateways/auth_gateway";
import StorageService from "../services/storage_service";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { KEY_JWT } from "../constants/storage_keys";
import { FormikHelpers } from "formik/dist/types";
import { AuthContext } from "../components/contexts/AuthContext";

export default function SignUpScreen() {
    const authGateway = new AuthGateway();

    const { setToken } = React.useContext(AuthContext);
    const [showPassword, setShowPass] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPass] = React.useState(false);

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    async function onSubmitSignUp(values: SignUpRequest, formikHelpers: FormikHelpers<SignUpRequest>): Promise<void> {
        try {
            const token = await authGateway.signUp(values);
            setToken(token.accessToken);
            StorageService.put(KEY_JWT, token);
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("email", error.message);
            }
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.title}>Create an account</Text>
            <Formik initialValues={initialValues} validationSchema={signUpSchema} onSubmit={onSubmitSignUp}>
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space="13" style={{ marginHorizontal: 20, marginTop: 35 }}>
                        <HStack space="13" justifyContent="center">
                            <FormControl isInvalid={!!(errors.firstName && touched.firstName)} style={{ flex: 1 }}>
                                <Input
                                    value={values.firstName}
                                    onChangeText={handleChange("firstName")}
                                    placeholder="First name"
                                    testID="firstName"
                                />

                                <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!(errors.lastName && touched.lastName)} style={{ flex: 1 }}>
                                <Input
                                    value={values.lastName}
                                    onChangeText={handleChange("lastName")}
                                    placeholder="Last name"
                                    testID="lastName"
                                />
                                <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage>
                            </FormControl>
                        </HStack>
                        <FormControl isInvalid={!!(errors.email && touched.email)}>
                            <Input
                                value={values.email}
                                onChangeText={handleChange("email")}
                                placeholder="Email"
                                testID="email"
                            />
                            <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
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
                                placeholder="Password (6+ characters)"
                                testID="password"
                            />

                            <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!(errors.confirmPassword && touched.confirmPassword)}>
                            <Input
                                value={values.confirmPassword}
                                type={showConfirmPassword ? "text" : "password"}
                                InputRightElement={
                                    <Pressable onPress={() => setShowConfirmPass(!showConfirmPassword)}>
                                        <FontAwesomeIcon
                                            icon={showConfirmPassword ? faEyeCustom : faEyeSlashCustom}
                                            style={styles.eyeIcon}
                                            size={20}
                                        />
                                    </Pressable>
                                }
                                onChangeText={handleChange("confirmPassword")}
                                placeholder="Confirm Password"
                                testID="confirmPassword"
                            />

                            <FormControl.ErrorMessage>{errors.confirmPassword}</FormControl.ErrorMessage>
                        </FormControl>

                        <Button style={{ marginTop: 7 }} onPress={submitForm}>
                            Sign up
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
