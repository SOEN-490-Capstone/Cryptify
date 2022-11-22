import { View } from "../components/Themed";
import React from "react";
import { Button, Center, FormControl, HStack, Input, Pressable, Text, VStack } from "native-base";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import WalletsList from "../components/wallets-list/WalletsList";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fasCirclePlusSolid } from "../components/icons/solid/fasCirclePlusSolid";
import { Formik, FormikHelpers } from "formik";
import { TagsGateway } from "../gateways/tags_gateway";
import { AuthContext } from "../components/contexts/AuthContext";

export default function EditTagScreen({route, navigation }: SettingsStackScreenProps<"EditTagScreen">) {

    const tagsGateway = new TagsGateway();
    const { token, user } = React.useContext(AuthContext);

    async function onSubmitEditTag(values: any, formikHelpers: FormikHelpers<any>) {
        // try {


        //     console.log(token);
        //     await tagsGateway.updateTag(
        //         {
        //             userId: user.id,
        //             currentName: route.params.tag.tagName,
        //             newName: values.tag,
        //         },
        //         token,
        //     );
        //     formikHelpers.resetForm();
        // } catch (error) {
        //     if (error instanceof Error) {
        //         formikHelpers.setFieldError("tag", error.message);
        //     }
        // }
    }

    const initialValues = {
        tag: route.params.tag.tagName,
    }

    return (
        <View style={styles.view}>
            <Center>
                <Text fontWeight={"semibold"} size={"title3"} style={styles.title}>Edit Tag</Text>
            </Center>
             <Formik initialValues={initialValues} onSubmit={onSubmitEditTag}>
                {({ values, handleChange, errors, touched, submitForm }) => (
                    <VStack space={13}>
                        <FormControl isInvalid={!!(errors.tag && touched.tag)}>
                            <Input
                                value={values.tag}
                                onChangeText={handleChange("tag")}
                                placeholder=""
                                testID="UpdatetagName"
                                maxLength={20}
                            />
                            <FormControl.ErrorMessage>{errors.tag}</FormControl.ErrorMessage>
                        </FormControl>
                        <Button isDisabled={initialValues.tag === values.tag} onPress={submitForm}>
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
        paddingHorizontal: 15,
        flex: 1,
    },
    title: {
        paddingVertical: 35,
    }
});