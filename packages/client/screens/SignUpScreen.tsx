import React from "react";
import { StyleSheet } from "react-native";
import { Input, Button, Box, Center, VStack, FormControl, Pressable, HStack } from "native-base";
import { Text, View } from "../components/Themed";
import { Formik } from "formik";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeCustom } from "../components/icons/faEyeCustom";
import { faEyeSlashCustom } from "../components/icons/faEyeSlashCustom";
import AuthGateway from "../gateways/auth_gateway";
import { put } from "../services/storage_service";
import { RootTabScreenProps } from "../types";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";

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
            put("@jwt", token);

            navigation.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Center w="100%">
                <Formik initialValues={initialValues} validationSchema={signUpSchema} onSubmit={onSubmitSignUp}>
                    {({ values, errors, touched, handleChange, submitForm }) => (
                        <Box safeArea style={styles.formContainer}>
                            <Box style={styles.formTitle}>
                                <Text style={styles.title}>Create an account</Text>
                            </Box>

                            <VStack space={3} mt="5">
                                <HStack direction="row" space={3} width="48%">
                                    <FormControl isInvalid={!!(errors.firstName && touched.firstName)}>
                                        <Input
                                            value={values.firstName}
                                            onChangeText={handleChange("firstName")}
                                            placeholder="First name"
                                            style={errors.firstName && touched.firstName ? styles.formError : null}
                                        />

                                        <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={!!(errors.lastName && touched.lastName)}>
                                        <Input
                                            value={values.lastName}
                                            onChangeText={handleChange("lastName")}
                                            placeholder="Last name"
                                            style={errors.lastName && touched.lastName ? styles.formError : null}
                                        />

                                        <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage>
                                    </FormControl>
                                </HStack>
                                <FormControl isInvalid={!!(errors.email && touched.email)}>
                                    <Input
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        placeholder="Email"
                                        style={errors.email && touched.email ? styles.formError : null}
                                    />
                                    <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!(errors.password && touched.password)}>
                                    <Input
                                        value={values.password}
                                        type={showPassword ? "text" : "password"}
                                        InputRightElement={
                                            <Pressable onPress={() => setShowPass(!showPassword)}>
                                                <FontAwesomeIcon icon={showPassword ? faEyeCustom : faEyeSlashCustom} />
                                            </Pressable>
                                        }
                                        onChangeText={handleChange("password")}
                                        placeholder="Password (6+ characters)"
                                        style={errors.password && touched.password ? styles.formError : null}
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
                                                />
                                            </Pressable>
                                        }
                                        onChangeText={handleChange("confirmPassword")}
                                        placeholder="Confirm Password"
                                        style={
                                            errors.confirmPassword && touched.confirmPassword ? styles.formError : null
                                        }
                                    />

                                    <FormControl.ErrorMessage>{errors.confirmPassword}</FormControl.ErrorMessage>
                                </FormControl>

                                <Button style={styles.formButton} onPress={submitForm}>
                                    Sign up
                                </Button>
                            </VStack>
                        </Box>
                    )}
                </Formik>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    formContainer: {
        p: "2",
        w: "90%",
        maxW: "290",
        py: "8",
        paddingHorizontal: 40,
        paddingVertical: 50,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
    },

    formTitle: {
        paddingBottom: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    formColumnInputs: {
        borderRadius: 10,
    },

    formButton: {
        borderRadius: 100,
        backgroundColor: "#0077E6",
        marginVertical: 10,
    },

    formError: {
        backgroundColor: "#FFE4E6",
        borderWidth: 0.5,
        borderColor: "#DC2626",
    },
});
