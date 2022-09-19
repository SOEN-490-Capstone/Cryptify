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

function SignUpForm() {
    const [showPassword, setShowPass] = React.useState(false);
    const handleClickPass = () => setShowPass(!showPassword);

    const [showConfirmPassword, setShowConfirmPass] = React.useState(false);
    const handleClickConfirmPass = () => setShowConfirmPass(!showConfirmPassword);

    const [formDataFname, setDataFname] = React.useState("");

    const [formDataLname, setDataLname] = React.useState({});

    const [errors, setErrors] = React.useState({});

    const validate = () => {
        if (formDataFname.length == 0) {
            setErrors({ ...errors, name: "Name is required" });
            console.log("error");
            return false;
        }
        return true;
    };

    const onSubmit = () => {
        validate() ? console.log("Submitted") : console.log("Validation Failed");
    };

    return (
        // <VStack style={styles.formContainer}>

        //     <Box style={styles.formTitle}>
        //         <Text style={styles.title}>Create your account</Text>
        //     </Box>

        //     <Box style={styles.formInputsContainer}>
        //         <Box style={styles.formNameInputBox}>
        //             <FormControl>
        //                 <Input
        //                     style={styles.formNameInput}
        //                     placeholder="First name"
        //                     onChangeText={(value) => setDataFname(value)}
        //                 />
        //                 <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
        //             </FormControl>

        //             <FormControl>
        //                 <Input
        //                     style={styles.formNameInput}
        //                     placeholder="Last name"
        //                     onChangeText={(value) => setDataLname({ ...formDataLname, name: value })}
        //                 />
        //             </FormControl>
        //         </Box>

        //         <Box style={styles.formColumnInputs}>
        //             <FormControl>
        //                 <Input style={styles.formInput} placeholder="Email" />
        //             </FormControl>
        //         </Box>

        //         <Box style={styles.formColumnInputs}>
        //             <FormControl>
        //                 <Input
        //                     style={styles.formInput}
        //                     placeholder="Password (6+ characters)"
        //                     type={showPassword ? "text" : "password"}
        //                     InputRightElement={<Button onPress={handleClickPass}> </Button>}
        //                 />
        //             </FormControl>
        //         </Box>

        //         <Box style={styles.formColumnInputs}>
        //             <FormControl>
        //                 <Input
        //                     style={styles.formInput}
        //                     placeholder="Confirm Password"
        //                     type={showConfirmPassword ? "text" : "password"}
        //                     InputRightElement={<Button onPress={handleClickConfirmPass}> </Button>}
        //                 />
        //             </FormControl>
        //         </Box>
        //     </Box>

        //     <Button style={styles.formSubmitButton} onPress={onSubmit}>
        //         Sign Up
        //     </Button>
        //     <Text>
        //         Already have an account? <Link href="">Sign in</Link>
        //     </Text>
        // </VStack>

        <Center w="100%" >
            <Box safeArea p="2" w="90%" maxW="290" py="8" style={styles.formContainer}>
                <Box style={styles.formTitle}>
                    <Text style={styles.title}>Create your account</Text>
                </Box>
                <VStack space={3} mt="5">

                  <HStack direction="row" space={3} width="48%" >  
                    <FormControl>
                    <Input placeholder="First Name"/>
                    </FormControl>

                    <FormControl>
                    <Input placeholder="Last Name"/>
                    </FormControl>
                </HStack>
                    <FormControl>
                        
                        <Input placeholder="Email"/>
                    </FormControl>
                    <FormControl>
                        
                        <Input
                            
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
                            placeholder="Password (6+ characters)"
                        />
                    </FormControl>
                    <FormControl>
                        
                        <Input
                        
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
                            placeholder="Confirm Password"
                        />
                    </FormControl>
                    <Button mt="2" backgroundColor={"#0077E6"}>
                        Sign up
                    </Button>
                    <Box style={styles.formText}>
                    <Text>
                        Already have an account? <Link href="" >Sign in</Link>
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

        paddingHorizontal: 40,
        paddingVertical: 50,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    formTitle: {
        paddingBottom: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    formInputsContainer: {
        padding: 10,
    },
    formNameInputBox: {
        flex: 1,
        width: "40%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        height: 46,
        maxWidth: 100,
        margin: "0 auto",
    },
    formColumnInputs: {
        marginBottom: 10,
    },
    formNameInput: {
        height: 46,
    },
    formInput: {
        height: 46,
        borderRadius: 10,
    },
    formSubmitButton: {
        borderRadius: 50,
    },
    formText: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    formLink:{
        color:"#0077E6",
        textDecoration: 'none'
    }
});
