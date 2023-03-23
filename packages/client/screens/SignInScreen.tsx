import React from "react";
import { StyleSheet } from "react-native";
import { Input, Button, VStack, FormControl, Pressable, Text, Link } from "native-base";
import { GuestStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falEye } from "../components/icons/light/falEye";
import { falEyeSlash } from "../components/icons/light/falEyeSlash";
import { AuthGateway } from "../gateways/auth_gateway";
import StorageService from "../services/storage_service";
import { SignInRequest } from "@cryptify/common/src/requests/sign_in_request";
import { signInSchema } from "@cryptify/common/src/validations/sign_in_schema";
import { KEY_JWT } from "../constants/storage_keys";
import { FormikHelpers } from "formik/dist/types";
import { ERROR_NOP } from "@cryptify/common/src/errors/error_messages";
import { AuthContext } from "../components/contexts/AuthContext";
import { UsersGateway } from "../gateways/users_gateway";

export default function SignInScreen(navigation: GuestStackScreenProps<"SignInScreen">) {
    const authGateway = new AuthGateway();
    const usersGateway = new UsersGateway();

    const { setToken, setUser } = React.useContext(AuthContext);
    const [showPassword, setShowPass] = React.useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    async function onSubmitSignIn(values: SignInRequest, formikHelpers: FormikHelpers<SignInRequest>): Promise<void> {
        try {
            const token = await authGateway.signIn(values);

            const user = await usersGateway.whoami(token.accessToken);
            setUser(user);

            setToken(token.accessToken);
            StorageService.put(KEY_JWT, token);
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("email", ERROR_NOP);
                formikHelpers.setFieldError("password", error.message);
            }
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text size={"title1"} fontWeight={"bold"} style={styles.title}>
                Welcome back
            </Text>
            <Formik initialValues={initialValues} validationSchema={signInSchema} onSubmit={onSubmitSignIn}>
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
                        <FormControl isInvalid={!!(errors.password && touched.password)}>
                            <Input
                                value={values.password}
                                type={showPassword ? "text" : "password"}
                                InputRightElement={
                                    <Pressable onPress={() => setShowPass(!showPassword)}>
                                        <FontAwesomeIcon
                                            icon={showPassword ? falEye : falEyeSlash}
                                            style={styles.eyeIcon}
                                            size={20}
                                        />
                                    </Pressable>
                                }
                                onChangeText={handleChange("password")}
                                placeholder="Password"
                                testID="password"
                            />
                            <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
                        </FormControl>
                        <Link onPress={() => navigation.navigation.navigate("ResetPasswordEmailScreen")} _text={{ color: "darkBlue.500", fontWeight: "400" }}
                        isUnderlined={false}>
                            forgot Password?
                        </Link>
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
        textAlign: "center",
    },
    eyeIcon: {
        color: "#404040",
        marginRight: 12,
    },
});
