import React from "react";
import { StyleSheet } from "react-native";
import { Input, Button, Box, Center, Link, VStack, FormControl, Icon, Pressable, HStack } from "native-base";
import { Text, View } from "../components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { signUpSchema } from "@cryptify/common/src/validations/sign_up_schema";

function SignUpForm() {
    const [showPassword, setShowPass] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPass] = React.useState(false);

    const userInfo = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    return (
        <Center w="100%">
            <Formik
                initialValues={userInfo}
                validationSchema={signUpSchema}
                onSubmit={(values) => {
                    async () => {
                        try {
                            const response = await fetch("localhost:3001/auth/signup", {
                                method: "POST",
                                body: JSON.stringify({
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    email: values.email,
                                    password: values.password,
                                }),
                            });
                            const json = await response.json();
                            return json.values;
                        } catch (error) {
                            console.error(error);
                        }
                    };
                }}
            >
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <Box safeArea style={styles.formContainer}>
                        <Box style={styles.formTitle}>
                            <Text style={styles.title}>Create your account</Text>
                        </Box>

                        <VStack space={3} mt="5">
                            <HStack direction="row" space={3} width="48%">
                                <FormControl isInvalid={errors.firstName && touched.firstName ? true : false}>
                                    <Input
                                        value={values.firstName}
                                        onChangeText={handleChange("firstName")}
                                        placeholder="First Name"
                                        style={errors.firstName && touched.firstName ? styles.formError : null}
                                    />

                                    <FormControl.ErrorMessage>{errors.firstName}</FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.lastName && touched.lastName ? true : false}>
                                    <Input
                                        value={values.lastName}
                                        onChangeText={handleChange("lastName")}
                                        placeholder="Last Name"
                                        style={errors.lastName && touched.lastName ? styles.formError : null}
                                    />

                                    <FormControl.ErrorMessage>{errors.lastName}</FormControl.ErrorMessage>
                                </FormControl>
                            </HStack>
                            <FormControl isInvalid={errors.email && touched.email ? true : false}>
                                <Input
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    placeholder="Email"
                                    style={errors.email && touched.email ? styles.formError : null}
                                />
                                <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.password && touched.password ? true : false}>
                                <Input
                                    value={values.password}
                                    type={showPassword ? "text" : "password"}
                                    InputRightElement={
                                        <Pressable onPress={() => setShowPass(!showPassword)}>
                                            <Icon
                                                as={
                                                    <MaterialIcons
                                                        name={showPassword ? "visibility" : "visibility-off"}
                                                    />
                                                }
                                                size={5}
                                                mr="2"
                                                color="muted.400"
                                            />
                                        </Pressable>
                                    }
                                    onChangeText={handleChange("password")}
                                    placeholder="Password (6+ characters)"
                                />

                                <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.confirmPassword && touched.confirmPassword ? true : false}>
                                <Input
                                    value={values.confirmPassword}
                                    type={showConfirmPassword ? "text" : "password"}
                                    InputRightElement={
                                        <Pressable onPress={() => setShowConfirmPass(!showConfirmPassword)}>
                                            <Icon
                                                as={
                                                    <MaterialIcons
                                                        name={showConfirmPassword ? "visibility" : "visibility-off"}
                                                    />
                                                }
                                                size={5}
                                                mr="2"
                                                color="muted.400"
                                            />
                                        </Pressable>
                                    }
                                    onChangeText={handleChange("confirmPassword")}
                                    placeholder="Confirm Password"
                                />

                                <FormControl.ErrorMessage>{errors.confirmPassword}</FormControl.ErrorMessage>
                            </FormControl>

                            <Button style={styles.formButton} onPress={submitForm}>
                                Sign up
                            </Button>

                            <Box style={styles.formText}>
                                <Text>
                                    Already have an account?
                                    <Link href="#">
                                        <Text style={styles.formLink}>Sign In</Text>
                                    </Link>
                                </Text>
                            </Box>
                        </VStack>
                    </Box>
                )}
            </Formik>
        </Center>
    );
}

export default function SignUpScreen() {
    return (
        <View style={styles.container}>
            <SignUpForm />
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
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E5E5E5",
        borderStyle: "solid",
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
    formText: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    formLink: {
        color: "#0077E6",
        textDecorationLine: "none",
        fontWeight: "bold",
        marginLeft: 10,
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
