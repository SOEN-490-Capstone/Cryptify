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

export default function CreateNewPasswordScreen(navigation: GuestStackScreenProps<"CreateNewPasswordScreen">) {
    const usersGateway = new UsersGateway();

    const { token, user, setUser } = React.useContext(AuthContext);
    const [showNewPassword, setShowNewPass] = React.useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPass] = React.useState(false);

    async function onSubmitCreateNewPassword(
        values: UpdateUserRequest,
        formikHelpers: FormikHelpers<UpdateUserRequest>,
    ) {
        try {
            const user = await usersGateway.update(
                { userId: values.userId, currentPassword: values.currentPassword, newPassword: values.newPassword },
                token,
            );
            setUser(user);

            values.newPassword = "";
            values.confirmNewPassword = "";
            navigation.navigation.navigate("SignInScreen");
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("newPassword", error.message);
            }
        }
    }

    const initialValues = {
        userId: user.id,
        newPassword: "",
        confirmNewPassword: "",
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
                validationSchema={updateUserSchema}
                onSubmit={onSubmitCreateNewPassword}
            >
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space={4} marginTop={5}>
                        <FormControl isInvalid={!!(errors.newPassword && touched.newPassword)}>
                            <Input
                                value={values.newPassword}
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
                                onChangeText={handleChange("newPassword")}
                                placeholder="New password (6+ characters)"
                                testID="newPassword"
                            />
                            <FormControl.ErrorMessage>{errors.newPassword}</FormControl.ErrorMessage>
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
                            disabled={!!(values.newPassword?.length == 0 || values.confirmNewPassword?.length == 0)}
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
