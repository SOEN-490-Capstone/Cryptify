import React from "react";
import { View } from "../../components/Themed";
import { Button, FormControl, Input, Pressable, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { Formik, FormikHelpers } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { updateUserSchema } from "@cryptify/common/src/validations/update_user_schema";
import { AuthContext } from "../../components/contexts/AuthContext";
import { UsersGateway } from "../../gateways/users_gateway";
import { UpdateUserRequest } from "@cryptify/common/src/requests/update_user_request";
import { falEye } from "../../components/icons/light/falEye";
import { falEyeSlash } from "../../components/icons/light/falEyeSlash";
import { GuestStackScreenProps } from "../../types";
import { AuthGateway } from "../../gateways/auth_gateway";
import { resetPasswordSchema } from "@cryptify/common/src/validations/reset_password_schema";
import { ResetPasswordRequest } from "@cryptify/common/src/requests/reset_password_request";

export default function CreateNewPasswordScreen(navigation: GuestStackScreenProps<"CreateNewPasswordScreen">) {
    const authGateway = new AuthGateway();

    const [showNewPassword, setShowNewPass] = React.useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPass] = React.useState(false);

    const accessToken = navigation.route.params.token;

    type formValues = ResetPasswordRequest & { confirmNewPassword: string }

    async function onSubmitCreateNewPassword(
        values: formValues,
        formikHelpers: FormikHelpers<formValues>,
    ) {
        try {
            await authGateway.resetPassword({token: accessToken, password: values.password});


            console.log(navigation.navigation);
            navigation.navigation.goBack();
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("newPassword", error.message);
            }
        }
    }

    const initialValues = {
        token: accessToken,
        password: "",
        confirmNewPassword: ""
    };

    return (
        <View style={styles.container}>
            <Text size={"title3"} fontWeight={"semibold"}>
                Reset your password
            </Text>

            <Text>
                Enter the email address associated with your account and we'll send you instructions to reset your
                password.
            </Text>
            <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordSchema}
                onSubmit={onSubmitCreateNewPassword}
            >
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space={4} marginTop={5} style={{width: "100%"}}>
                        <FormControl isInvalid={!!(errors.password && touched.password)}>
                            <Input
                                value={values.password}
                                type={showNewPassword ? "text" : "password"}
                                InputRightElement={
                                    <Pressable onPress={() => setShowNewPass(!showNewPassword)}>
                                        <FontAwesomeIcon
                                            icon={showNewPassword ? falEye : falEyeSlash}
                                            style={styles.eyeIcon}
                                            size={20}
                                        />
                                    </Pressable>
                                }
                                onChangeText={handleChange("password")}
                                placeholder="New password (6+ characters)"
                                testID="newPassword"
                            />
                            <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!(errors.confirmNewPassword && touched.confirmNewPassword)}>
                            <Input
                                value={values.confirmNewPassword}
                                type={showConfirmNewPassword ? "text" : "password"}
                                InputRightElement={
                                    <Pressable onPress={() => setShowConfirmNewPass(!showConfirmNewPassword)}>
                                        <FontAwesomeIcon
                                            icon={showConfirmNewPassword ? falEye : falEyeSlash}
                                            style={styles.eyeIcon}
                                            size={20}
                                        />
                                    </Pressable>
                                }
                                onChangeText={handleChange("confirmNewPassword")}
                                placeholder="Confirm new password"
                                testID="ConfirmNewPassword"
                            />
                            <FormControl.ErrorMessage>{errors.confirmNewPassword}</FormControl.ErrorMessage>
                        </FormControl>
                        <Button
                            disabled={!!(values.password?.length == 0 || values.confirmNewPassword?.length == 0)}
                            onPress={submitForm}
                        >
                            Reset Password
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
    eyeIcon: {
        color: "#404040",
        marginRight: 12,
    },
});
