import { View } from "../../components/Themed";
import React from "react";
import { Box, Button, FormControl, Input, useToast, Text, VStack, Pressable } from "native-base";
import { StyleSheet } from "react-native";
import { AuthContext } from "../../components/contexts/AuthContext";
import { updateUserSchema } from "@cryptify/common/src/validations/update_user_schema";
import { UsersGateway } from "../../gateways/users_gateway";
import { Formik, FormikHelpers } from "formik";
import { UpdateUserRequest } from "@cryptify/common/src/requests/update_user_request";
import { falEye } from "../../components/icons/light/falEye";
import { falEyeSlash } from "../../components/icons/light/falEyeSlash";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function AccountPasswordScreen() {
    const usersGateway = new UsersGateway();

    const { token, user, setUser } = React.useContext(AuthContext);
    const [showCurrentPassword, setShowCurrentPass] = React.useState(false);
    const [showNewPassword, setShowNewPass] = React.useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPass] = React.useState(false);
    const toast = useToast();

    const intitialValues = {
        userId: user.id,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    };

    async function handleUpdate(values: UpdateUserRequest, formikHelpers: FormikHelpers<UpdateUserRequest>) {
        try {
            const user = await usersGateway.update(
                { userId: values.userId, currentPassword: values.currentPassword, newPassword: values.newPassword },
                token,
            );
            setUser(user);

            toast.show({
                placement: "top",
                duration: 2000,
                render: () => {
                    return (
                        <Box style={styles.toastBox}>
                            <Text size={"footnote1"} fontWeight={"semibold"} color={"white"} style={styles.toastText}>
                                Password updated succesfully
                            </Text>
                        </Box>
                    );
                },
            });

            values.currentPassword = "";
            values.newPassword = "";
            values.confirmNewPassword = "";
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("currentPassword", error.message);
            }
        }
    }

    return (
        <View style={styles.view}>
            <Formik initialValues={intitialValues} validationSchema={updateUserSchema} onSubmit={handleUpdate}>
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space={4} marginTop={5}>
                        <FormControl isInvalid={!!(errors.currentPassword && touched.currentPassword)}>
                            <Input
                                value={values.currentPassword}
                                type={showCurrentPassword ? "text" : "password"}
                                InputRightElement={
                                    <Pressable onPress={() => setShowCurrentPass(!showCurrentPassword)}>
                                        <FontAwesomeIcon
                                            icon={showCurrentPassword ? falEye : falEyeSlash}
                                            style={styles.eyeIcon}
                                            size={20}
                                        />
                                    </Pressable>
                                }
                                onChangeText={handleChange("currentPassword")}
                                placeholder="Current password"
                                testID="currentPassword"
                            />
                            <FormControl.ErrorMessage>{errors.currentPassword}</FormControl.ErrorMessage>
                        </FormControl>
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
                            isDisabled={
                                !!(
                                    values.currentPassword?.length == 0 ||
                                    values.newPassword?.length == 0 ||
                                    values.confirmNewPassword?.length == 0
                                )
                            }
                            style={styles.Button}
                            onPress={submitForm}
                        >
                            Save changes
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
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    Button: {
        marginTop: 5,
    },
    ButtonDisabled: {
        opacity: 0.6,
        marginTop: 5,
    },
    toastBox: {
        backgroundColor: "#404040",
        borderRadius: 100,
    },
    toastText: {
        paddingHorizontal: 25.5,
        paddingVertical: 10.5,
    },
    eyeIcon: {
        color: "#404040",
        marginRight: 12,
    },
});
