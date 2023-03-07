import { View } from "../../components/Themed";
import React from "react";
import { Button, FormControl, Input } from "native-base";
import { StyleSheet } from "react-native";
import { AuthContext } from "../../components/contexts/AuthContext";
import { updateUserNameSchema } from "@cryptify/common/src/validations/update_user_name_schema";
import { UsersGateway } from "../../gateways/users_gateway";
import { Formik, FormikHelpers } from "formik";
import { ERROR_NOP } from "@cryptify/common/src/errors/error_messages";
import { UpdateUserRequest } from "@cryptify/common/src/requests/update_user_request";

export default function AccountNameScreen() {
    const usersGateway = new UsersGateway();

    const { token, user, setUser } = React.useContext(AuthContext);

    const intitialValues = {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
    }

    async function handleUpdate(values: UpdateUserRequest, formikHelpers: FormikHelpers<UpdateUserRequest>) {
        try {
            const user = await usersGateway.update(values, token);
            setUser(user);

        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("firstName", ERROR_NOP);
                formikHelpers.setFieldError("lastName", error.message);
            }
        }
       
    }

    
    return (
        <View style={styles.view}>
            <Formik initialValues={intitialValues} validationSchema={updateUserNameSchema} onSubmit={handleUpdate}>
                {({values, errors, handleChange, submitForm}) =>(
                    <FormControl>
                         <Input
                                value={values.firstName}
                                onChangeText={handleChange("firstName")}
                                placeholder="firstName"
                                testID="firstName"
                            />
                            <FormControl.ErrorMessage>
                                {errors.firstName != ERROR_NOP && errors.firstName}
                            </FormControl.ErrorMessage>
                            <Input
                                value={values.lastName}
                                onChangeText={handleChange("lastName")}
                                placeholder="lastName"
                                testID="lastName"
                            />
                            <FormControl.ErrorMessage>
                                {errors.lastName != ERROR_NOP && errors.lastName}
                            </FormControl.ErrorMessage>
                            <Button disabled={intitialValues.firstName === values.firstName && intitialValues.lastName  === values.lastName} style={ intitialValues.firstName === values.firstName && intitialValues.lastName === values.lastName  ? styles.ButtonDisabled : styles.Button } onPress={submitForm}>
                                Save changes
                            </Button>
                    </FormControl>
                    
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
        marginTop: "auto",
    },
    ButtonDisabled: {
        marginTop: "auto",
        opacity: 0.6,
    },
});
