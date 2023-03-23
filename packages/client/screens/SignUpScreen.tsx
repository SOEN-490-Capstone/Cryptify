import React from "react";
import { StyleSheet } from "react-native";
import { Input, Button, VStack, FormControl, Pressable, HStack, Text } from "native-base";
import { View } from "../components/Themed";
import { Formik } from "formik";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falEye } from "../components/icons/light/falEye";
import { falEyeSlash } from "../components/icons/light/falEyeSlash";
import { AuthGateway } from "../gateways/auth_gateway";
import { SignUpRequest } from "@cryptify/common/src/requests/sign_up_request";
import { FormikHelpers } from "formik/dist/types";
import { AuthContext } from "../components/contexts/AuthContext";
import { UsersGateway } from "../gateways/users_gateway";
import { GuestStackScreenProps } from "../types";

export default function SignUpScreen({ navigation }: GuestStackScreenProps<"SignUpScreen">) {
    const authGateway = new AuthGateway();
    const usersGateway = new UsersGateway();

    const { setUser } = React.useContext(AuthContext);
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

            const user = await usersGateway.whoami(token.accessToken);
            setUser(user);

            navigation.navigate("SignUpNotificationsScreen", {
                user: user,
                token: token,
            });
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("email", error.message);
            }
        }
    }
    return (
        <View style={styles.view}>
            <Text size={"title1"} fontWeight={"semibold"} textAlign={"center"}>
                Create an account
            </Text>
            <Formik initialValues={initialValues} validationSchema={signUpSchema} onSubmit={onSubmitSignUp}>
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space="13px" style={{ marginTop: 35 }}>
                        <FormControl isInvalid={!!(errors.firstName && touched.firstName)}>
                            <Input
                                value={values.firstName}
                                onChangeText={handleChange("firstName")}
                                placeholder="First name"
                                testID="firstName"
                            />
                            <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!(errors.lastName && touched.lastName)}>
                            <Input
                                value={values.lastName}
                                onChangeText={handleChange("lastName")}
                                placeholder="Last name"
                                testID="lastName"
                            />
                            <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage>
                        </FormControl>
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
                                            icon={showPassword ? falEye : falEyeSlash}
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
                                            icon={showConfirmPassword ? falEye : falEyeSlash}
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
    view: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 15,
    },
    eyeIcon: {
        color: "#404040",
        marginRight: 12,
    },
});
