import React from "react";
import { StyleSheet } from "react-native";
import { Input, Button, VStack, FormControl, Pressable } from "native-base";
import { Text, View } from "../components/Themed";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeCustom } from "../components/icons/faEyeCustom";
import { faEyeSlashCustom } from "../components/icons/faEyeSlashCustom";
import AuthGateway from "../gateways/auth_gateway";
import StorageService from "../services/storage_service";
import { RootTabScreenProps } from "../types";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";
import { signInSchema } from "@cryptify/common/src/validations/sign_in_schema";
import { KEY_JWT } from "../constants/storage_keys";

export default function SignInScreen({ navigation }: RootTabScreenProps<"SignInScreen">) {
    const [showPassword, setShowPass] = React.useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    async function onSubmitSignIn(values: SignInRequest): Promise<void> {
        try {
            const token = await AuthGateway.signIn(values);
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
            <Text style={styles.title}>Welcome back</Text>
            <Formik initialValues={initialValues} validationSchema={signInSchema} onSubmit={onSubmitSignIn}>
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space={3} style={{ marginHorizontal: 20, marginTop: 35 }}>
                        <FormControl isInvalid={!!(errors.email && touched.email)}>
                            <Input
                                value={values.email}
                                onChangeText={handleChange("email")}
                                placeholder="Email"
                                style={errors.email && touched.email ? styles.formError : null}
                                borderRadius="10"
                                height="46"
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
                                        />
                                    </Pressable>
                                }
                                onChangeText={handleChange("password")}
                                placeholder="Password (6+ characters)"
                                style={errors.password && touched.password ? styles.formError : null}
                                borderRadius="10"
                                height="46"
                            />

                            <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
                        </FormControl>
                        <Button
                            style={styles.formButton}
                            onPress={submitForm}
                            mt={2}
                            _text={{ fontWeight: 600, fontSize: 16 }}
                        >
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
        fontWeight: "bold",
        textAlign: "center",
    },
    formButton: {
        height: 44,
        borderRadius: 100,
        backgroundColor: "#0077E6",
    },
    formError: {
        backgroundColor: "#FFE4E6",
        borderWidth: 0.5,
        borderColor: "#DC2626",
    },
    eyeIcon: {
        color: "#404040",
        width: 20,
        height: 16,
        marginRight: 12,
    },
});
