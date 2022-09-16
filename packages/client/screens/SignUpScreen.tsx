import React from "react";
import { StyleSheet } from "react-native";
import { useForm, Controller } from 'react-hook-form';

import { Input, Button, Box, Center, NativeBaseProvider, Checkbox, Link, VStack, FormControl } from "native-base";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

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
            setErrors({ ...errors,
                name: 'Name is required'
              });
            console.log("error")
          return false;
        }
        return true;
      }

      const onSubmit = () => {
        validate() ? console.log('Submitted') : console.log('Validation Failed');
      };

  
    return <VStack style={styles.formContainer}>

        <Box style={styles.formTitle}>
        <Text style={styles.title}>Create your account</Text>
        </Box>

        
        <FormControl style={styles.formInputsContainer}>

        <Box style={styles.formNameInputBox}>     
        
        <Input style={styles.formNameInput} placeholder="First name" onChangeText={value => setDataFname(value)} />
        <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>

        <Input style={styles.formNameInput} placeholder="Last name" onChangeText={value => setDataLname({ ...formDataLname, name: value})}/>
        </Box>

        <Box style={styles.formColumnInputs} >
        <Input style={styles.formInput} placeholder="Email" />
        </Box>

        <Box style={styles.formColumnInputs} >
        <Input style={styles.formInput} placeholder="Password (6+ characters)" type={showPassword ? "text" : "password"}  InputRightElement={
        <Button onPress={handleClickPass}></Button>} />
        </Box>

        <Box style={styles.formColumnInputs} >
        <Input style={styles.formInput} placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"}  InputRightElement={
        <Button  onPress={handleClickConfirmPass}> </Button>} />
        </Box>

        </FormControl>

          
          <Button style={styles.formSubmitButton} onPress={onSubmit}>Sign Up</Button>
          <Text>Already have an account? <Link href="">Sign in</Link></Text>

        </VStack>;
  };
  

export default function SignUpScreen() {
    return (
        <View style={styles.container}>
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

    formContainer: {
  
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#E5E5E5",
        borderStyle: "solid",
        padding: 50,
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
        padding: 10,
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
      margin: "0 auto"
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
        borderRadius: 10,
    }

});
