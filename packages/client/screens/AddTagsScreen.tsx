import React from "react";
import { View } from "../components/Themed";
import { Badge, Center, FormControl, HStack, Input, Text } from "native-base";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AuthContext } from "../components/contexts/AuthContext";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { TagsGateway } from "../gateways/tags_gateway";
import { Formik, FormikHelpers } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SortService from "../services/sort_service";

export default function AddTagsScreen() {
    const tagsGateway = new TagsGateway();

    const { token, user } = React.useContext(AuthContext);

    const [newTags, setNewTags] = React.useState<TransactionTag[]>([]);

    const initialValues = {
        tag: "",
    };
    
    async function onSubmitCreateTag(values: any, formikHelpers: FormikHelpers<any>): Promise<void> {
        try {
            const newlyCreatedTag = await tagsGateway.createTags(
                {
                    tagName: values.tag,
                    userId: user.id,
                    transactionIds: undefined,
                },
                token,
            );
            setNewTags(SortService.sortTransactionTagsAlphabetically([...newTags, newlyCreatedTag]));
            formikHelpers.resetForm();
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("tag", error.message);
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.view}>
                <Center>
                    <Text fontWeight={"semibold"} size={"title3"} style={styles.title}>
                        Add a Tag
                    </Text>
                </Center>
                <Formik initialValues={initialValues} onSubmit={onSubmitCreateTag}>
                    {({ values, handleChange, errors, touched, submitForm, isSubmitting }) => (
                        <HStack space="5">
                            <FormControl isInvalid={!!(errors.tag && touched.tag)} style={styles.tagForm}>
                                <Input
                                    value={values.tag}
                                    onChangeText={handleChange("tag")}
                                    placeholder="For e.g., Trip"
                                    testID="AddedtagName"
                                    maxLength={20}
                                    keyboardType={"ascii-capable"}
                                    onSubmitEditing={submitForm}
                                    enablesReturnKeyAutomatically={true}
                                    autoFocus={true}
                                    ref={(input) => {
                                        isSubmitting && input?.focus();
                                    }}
                                />
                                <FormControl.ErrorMessage>{errors.tag}</FormControl.ErrorMessage>
                            </FormControl>
                        </HStack>
                    )}
                </Formik>

                {newTags.length != 0 && (
                    <>
                        {/*TODO: match style of TransactionTagsScreen.tsx*/}
                        <Text fontWeight={"semibold"} size={"title3"} style={styles.tagList}>
                            Tags Added
                        </Text>
                        <KeyboardAwareScrollView>
                            <HStack flexWrap="wrap" space="13">
                                {newTags.map((tag, i) => (
                                    // TODO create a component and use it for both tags list
                                    <Badge
                                        rounded="md"
                                        color="gray.100"
                                        style={styles.badge}
                                        key={i}
                                        _text={{ fontSize: "subheadline", fontWeight: "semibold" }}
                                    >
                                        {tag.tagName}
                                    </Badge>
                                ))}
                            </HStack>
                        </KeyboardAwareScrollView>
                    </>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 15,
    },
    badge: {
        marginBottom: 12,
    },
    tagIcon: {
        color: "#404040",
    },
    noTagsText: {
        marginTop: 15,
    },
    addTagButton: {
        marginLeft: "auto",
        flex: 0.5,
    },
    tagForm: {
        marginRight: "auto",
        flex: 1,
    },
    title: {
        marginBottom: 35,
    },
    tagList: {
        marginTop: 40,
        marginBottom: 20,
    },
});
