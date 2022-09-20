import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";

import {
    Input,
    Button,
    Box,
    Center,
    NativeBaseProvider,
    Checkbox,
    Link,
    VStack,
    FormControl,
    Heading,
    Icon,
    Pressable,
    HStack,
} from "native-base";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import { MaterialIcons } from "@expo/vector-icons";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";
import { Formik } from "formik";
import * as yup from "yup";

function SignUpForm() {
    const [showPassword, setShowPass] = React.useState(false);
    const handleClickPass = () => setShowPass(!showPassword);

    const [showConfirmPassword, setShowConfirmPass] = React.useState(false);
    const handleClickConfirmPass = () => setShowConfirmPass(!showConfirmPassword);

    const isValidObjField = (obj: any) => {
        return Object.values(userInfo).every((value) => value.trim());
    };

    const [errors, setErrors] = React.useState({});

    const [userInfo, setUserInfo] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { firstName, lastName, email, password, confirmPassword } = userInfo;

    const handleOnChangeText = (value: string, fieldName: string) => {
        setUserInfo({ ...userInfo, [fieldName]: value });
    };

    const isValidForm = () => {
        if (!isValidObjField(userInfo)) return;
    };

    const submitForm = () => {
        validate();
        console.log(userInfo);
    };

    const validate = () => {
        if (userInfo.firstName === undefined) {
            setErrors({ ...errors, [firstName]: "Enter a first name" });
            return false;
        }
        return true;
    };

    // const validate = () => {
    //     if (formDataFname.length == 0) {
    //         setErrors({ ...errors, name: "Name is required" });
    //         console.log("error");
    //         return false;
    //     }
    //     return true;
    // };

    // const onSubmit = () => {
    //     validate() ? console.log("Submitted") : console.log("Validation Failed");
    // };

    return (
        <Center w="100%">
            <Box safeArea style={styles.formContainer}>
                <Box style={styles.formTitle}>
                    <Text style={styles.title}>Create your account</Text>
                </Box>

                <VStack space={3} mt="5">
                    <HStack direction="row" space={3} width="48%">
                        <FormControl isInvalid={"lastName" in errors}>
                            <Input
                                value={firstName}
                                onChangeText={(value) => handleOnChangeText(value, "firstName")}
                                placeholder="First Name"
                            />
                            {"firstNameError" in errors ? (
                                <FormControl.ErrorMessage>Enter a first name</FormControl.ErrorMessage>
                            ) : null}
                        </FormControl>

                        <FormControl>
                            <Input
                                value={lastName}
                                onChangeText={(value) => handleOnChangeText(value, "lastName")}
                                placeholder="Last Name"
                            />
                            {"name" in errors ? (
                                <FormControl.ErrorMessage>Enter a last name.</FormControl.ErrorMessage>
                            ) : null}
                        </FormControl>
                    </HStack>
                    <FormControl>
                        <Input
                            value={email}
                            onChangeText={(value) => handleOnChangeText(value, "email")}
                            placeholder="Email"
                        />
                        <FormControl.ErrorMessage>Enter a valid email.</FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl>
                        <Input
                            value={password}
                            type={showPassword ? "text" : "password"}
                            InputRightElement={
                                <Pressable onPress={() => setShowPass(!showPassword)}>
                                    <Icon
                                        as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                                        size={5}
                                        mr="2"
                                        color="muted.400"
                                    />
                                </Pressable>
                            }
                            onChangeText={(value) => handleOnChangeText(value, "password")}
                            placeholder="Password (6+ characters)"
                        />

                        <FormControl.ErrorMessage>Enter a valid password.</FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl>
                        <Input
                            value={confirmPassword}
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
                            onChangeText={(value) => handleOnChangeText(value, "confirmPassword")}
                            placeholder="Confirm Password"
                        />

                        <FormControl.ErrorMessage>Password did not match.</FormControl.ErrorMessage>
                    </FormControl>

                    <Button style={styles.formButton} onPress={submitForm}>
                        Sign up
                    </Button>
                    <Box style={styles.formText}>
                        <Text>
                            Already have an account?
                            <Link href="">
                                <Text style={styles.formLink}>Sign In</Text>
                            </Link>
                        </Text>
                    </Box>
                </VStack>
            </Box>
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
        textDecoration: "none",
        fontWeight: "bold",
    },
    formButton: {
        borderRadius: 100,
        backgroundColor: "#0077E6",
        marginVertical: 10,
    },
});
