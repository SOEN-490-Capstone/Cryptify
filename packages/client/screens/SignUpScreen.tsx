import React from "react";
import { StyleSheet } from "react-native";

import { Input, Button, Box, Center, NativeBaseProvider, Checkbox, Link } from "native-base";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

function SignUpForm() {
    const [show, setShow] = React.useState(false);
  
    const handleClick = () => setShow(!show);
  
    return <Box alignItems="center">
        <Input variant="rounded" size="lg" placeholder="First name" />
            <Input variant="rounded" size="lg" placeholder="Last name" />
            <Input variant="rounded" size="lg" placeholder="Email" />
            <Input type={show ? "text" : "password"} w="100%" py="0" InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>} placeholder="Password (6+ characters)" />
          <Input type={show ? "text" : "password"} w="100%" py="0" InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>} placeholder="Confirm Password" />
          <Checkbox shadow={2} value="test" > Remember Me</Checkbox>
          <Button variant="rounded">Sign Up</Button>
          <Text>Already have an account? <Link href="">Sign in</Link></Text>

        </Box>;
  };
  

export default function SignUpScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create your account</Text>
            <SignUpForm/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
});
