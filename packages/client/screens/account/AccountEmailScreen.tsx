import { View } from "../../components/Themed";
import React from "react";
import { Box, Button, FormControl, Input, useToast, Text, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { AuthContext } from "../../components/contexts/AuthContext";
import { updateUserSchema } from "@cryptify/common/src/validations/update_user_schema";
import { UsersGateway } from "../../gateways/users_gateway";
import { Formik, FormikHelpers } from "formik";
import { UpdateUserRequest } from "@cryptify/common/src/requests/update_user_request";

export default function AccountNameScreen() {
    const usersGateway = new UsersGateway();

    const { token, user, setUser } = React.useContext(AuthContext);
    const toast = useToast();

    const intitialValues = {
        userId: user.id,
        email: "",
        confirmEmail: "",
    };

    async function handleUpdate(values: UpdateUserRequest, formikHelpers: FormikHelpers<UpdateUserRequest>) {
        const newEmail = values.email;
        const oldEmail = user.email;

        try {
            if (newEmail == oldEmail) {
                formikHelpers.setFieldError("email", "This email address is already associated with your account.");
                return;
            }

            const user = await usersGateway.update(
                { userId: values.userId, email: values.email, confirmEmail: values.confirmEmail },
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
                                Email updated successfully
                            </Text>
                        </Box>
                    );
                },
            });

            values.confirmEmail = "";
            values.email = "";
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("confirmEmail", error.message);
                formikHelpers.setFieldError("email", error.message);
            }
        }
    }

    return (
        <View style={styles.view}>
            <Formik initialValues={intitialValues} validationSchema={updateUserSchema} onSubmit={handleUpdate}>
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space={"35px"}>
                        <VStack space={"20px"}>
                            <Text size={"title3"} fontWeight={"semibold"}>
                                Current
                            </Text>
                            <Text>{user.email}</Text>
                        </VStack>
                        <VStack>
                            <Text size={"title3"} fontWeight={"semibold"}>
                                New
                            </Text>
                            <VStack space={"13px"} marginTop={"15px"}>
                                <FormControl isInvalid={!!(errors.email && touched.email)}>
                                    <Input
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        placeholder="Email"
                                        testID="email"
                                    />
                                    <FormControl.ErrorMessage>{touched.email && errors.email}</FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!(errors.confirmEmail && touched.confirmEmail)}>
                                    <Input
                                        value={values.confirmEmail}
                                        onChangeText={handleChange("confirmEmail")}
                                        placeholder="Confirm email"
                                        testID="confirmEmail"
                                    />
                                    <FormControl.ErrorMessage>
                                        {touched.confirmEmail && errors.confirmEmail}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <Button
                                    isDisabled={!(values.confirmEmail && values.email)}
                                    onPress={submitForm}
                                    marginTop={"7px"}
                                >
                                    Save changes
                                </Button>
                            </VStack>
                        </VStack>
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
        paddingTop: 20,
    },
    toastBox: {
        backgroundColor: "#404040",
        borderRadius: 100,
    },
    toastText: {
        paddingHorizontal: 25.5,
        paddingVertical: 10.5,
    },
});
