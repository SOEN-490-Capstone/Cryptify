import { View } from "../components/Themed";
import React from "react";
import { Box, Button, Center, FormControl, Input, Text, useToast, VStack } from "native-base";
import { SettingsStackScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { Formik, FormikHelpers } from "formik";
import { TagsGateway } from "../gateways/tags_gateway";
import { AuthContext } from "../components/contexts/AuthContext";

export default function EditTagScreen({ route }: SettingsStackScreenProps<"EditTagScreen">) {
    const tagsGateway = new TagsGateway();
    const { token, user } = React.useContext(AuthContext);

    const [currentTagName, SetCurrentTagName] = React.useState<string>(route.params.tag.tagName);

    const toast = useToast();

    async function onSubmitEditTag(values: any, formikHelpers: FormikHelpers<any>) {
        try {
            const updatedTag = await tagsGateway.updateTag(
                {
                    userId: user.id,
                    currentName: currentTagName,
                    newName: values.tag,
                },
                token,
            );

            SetCurrentTagName(updatedTag.tagName);
            
            toast.show({
                placement: "top",
                duration: 2000,
                render: () => {
                    return (
                        <Box style={styles.toastBox}>
                            <Text size={"footnote1"} fontWeight={"semibold"} color={"white"} style={styles.toastText}>
                                Tag changes saved successfully
                            </Text>
                        </Box>
                    );
                },
            });

        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("tag", error.message);
            }
        }
    }

    const initialValues = {
        tag: currentTagName,
    };

    return (
        <View style={styles.view}>
            <Center>
                <Text fontWeight={"semibold"} size={"title3"} style={styles.title}>
                    Edit Tag
                </Text>
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
