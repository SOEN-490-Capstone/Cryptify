import { View } from "../components/Themed";
import React from "react";
import { Box, Button, Center, FormControl, Input, Link, Text, useToast, VStack } from "native-base";
import { SettingsStackScreenProps } from "../types";
import { Alert, StyleSheet } from "react-native";
import { Formik, FormikHelpers } from "formik";
import { TagsGateway } from "../gateways/tags_gateway";
import { AuthContext } from "../components/contexts/AuthContext";

export default function EditTagScreen({ navigation, route }: SettingsStackScreenProps<"EditTagScreen">) {
    const tagsGateway = new TagsGateway();
    const { token, user } = React.useContext(AuthContext);

    const [currentTagName, setCurrentTagName] = React.useState<string>(route.params.tag.tagName);

    const toast = useToast();

    type TagValue = {
        tag: string;
    };

    async function onSubmitEditTag(values: TagValue, formikHelpers: FormikHelpers<TagValue>) {
        try {
            const updatedTag = await tagsGateway.updateTag(
                {
                    userId: user.id,
                    currentName: currentTagName,
                    newName: values.tag,
                    addTransactions: undefined,
                    removeTransactions: undefined,
                },
                token,
            );

            setCurrentTagName(updatedTag.tagName);

            // TODO refactor this into a separate toast component in the future.
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

    function handleDeleteTag(): void {
        Alert.alert(`Delete ${currentTagName} ?`, "Are you sure you want to delete this tag?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    await tagsGateway.deleteTag({ id: user.id, name: currentTagName }, token);
                    navigation.goBack();
                },
            },
        ]);
    }

    const initialValues = {
        tag: currentTagName,
    };

    React.useEffect(() => {
        (() => {
            navigation.setOptions({
                headerRight: () => {
                    return (
                        <>
                            <Link
                                onPress={handleDeleteTag}
                                isUnderlined={false}
                                _text={{
                                    color: "red.500",
                                    fontWeight: "semi-bold",
                                }}
                            >
                                Delete
                            </Link>
                        </>
                    );
                },
            });
        })();
    });

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
                                testID="editTagInput"
                                maxLength={20}
                                keyboardType={"ascii-capable"}
                                autoFocus={true}
                            />
                            <FormControl.ErrorMessage>{errors.tag}</FormControl.ErrorMessage>
                        </FormControl>
                        <Button isDisabled={initialValues.tag === values.tag} onPress={submitForm} testID="submit">
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
