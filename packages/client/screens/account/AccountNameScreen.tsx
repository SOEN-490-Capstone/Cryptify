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
        firstName: user.firstName,
        lastName: user.lastName,
    };

    async function handleUpdate(values: UpdateUserRequest, formikHelpers: FormikHelpers<UpdateUserRequest>) {
        try {
            const user = await usersGateway.update(values, token);
            setUser(user);

            toast.show({
                placement: "top",
                duration: 2000,
                render: () => {
                    return (
                        <Box style={styles.toastBox}>
                            <Text size={"footnote1"} fontWeight={"semibold"} color={"white"} style={styles.toastText}>
                                Name updated succesfully
                            </Text>
                        </Box>
                    );
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("firstName", error.message);
                formikHelpers.setFieldError("lastName", error.message);
            }
        }
    }

    return (
        <View style={styles.view}>
            <Formik initialValues={intitialValues} validationSchema={updateUserSchema} onSubmit={handleUpdate}>
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space={4} marginTop={7}>
                        <FormControl isInvalid={!!(errors.firstName && touched.firstName)}>
                            <Input
                                value={values.firstName}
                                onChangeText={handleChange("firstName")}
                                placeholder="firstName"
                                testID="firstName"
                            />
                            <FormControl.ErrorMessage>{touched.firstName && errors.firstName}</FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!(errors.lastName && touched.lastName)}>
                            <Input
                                value={values.lastName}
                                onChangeText={handleChange("lastName")}
                                placeholder="lastName"
                                testID="lastName"
                            />
                            <FormControl.ErrorMessage>{touched.lastName && errors.lastName}</FormControl.ErrorMessage>
                            <Button
                                disabled={
                                    intitialValues.firstName === values.firstName &&
                                    intitialValues.lastName === values.lastName
                                }
                                style={
                                    intitialValues.firstName === values.firstName &&
                                    intitialValues.lastName === values.lastName
                                        ? styles.ButtonDisabled
                                        : styles.Button
                                }
                                onPress={submitForm}
                            >
                                Save changes
                            </Button>
                        </FormControl>
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
});
