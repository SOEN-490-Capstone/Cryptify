import React from "react";
import { StyleSheet } from "react-native";
import { Input, Button, VStack, FormControl, Pressable, HStack, Text } from "native-base";
import { View } from "../components/Themed";
import { Formik } from "formik";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeCustom } from "../components/icons/faEyeCustom";
import { faEyeSlashCustom } from "../components/icons/faEyeSlashCustom";
import AuthGateway from "../gateways/auth_gateway";
import StorageService from "../services/storage_service";
import { RootTabScreenProps } from "../types";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { KEY_JWT } from "../constants/storage_keys";

export default function SignUpScreen({ navigation }: RootTabScreenProps<"SignUpScreen">) {
    const [showPassword, setShowPass] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPass] = React.useState(false);

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    async function onSubmitSignUp(values: SignUpRequest): Promise<void> {
        try {
            const token = await AuthGateway.signUp(values);
            StorageService.put(KEY_JWT, token);

            navigation.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
            });
        } catch (error) {
            console.error(error);
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
                                />

                                <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!(errors.lastName && touched.lastName)} style={{ flex: 1 }}>
                                <Input
                                    value={values.lastName}
                                    onChangeText={handleChange("lastName")}
                                    placeholder="Last name"
                                />
                                <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage>
                            </FormControl>
                        </HStack>
                        <FormControl isInvalid={!!(errors.email && touched.email)}>
                            <Input value={values.email} onChangeText={handleChange("email")} placeholder="Email" />
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
        fontWeight: "bold",
        textAlign: "center",
    },
    eyeIcon: {
        color: "#404040",
        marginRight: 12,
    },
});
