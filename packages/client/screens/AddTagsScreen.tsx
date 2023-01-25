import React from "react";
import { View } from "../components/Themed";
import { Center, FormControl, HStack, Input, Text, VStack } from "native-base";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AuthContext } from "../components/contexts/AuthContext";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { TagsGateway } from "../gateways/tags_gateway";
import { Formik, FormikHelpers } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SortService from "../services/sort_service";
import TagsGallery from "../components/tags/TagsGallery";

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
                <VStack space={"35px"}>
                    <Center>
                        <Text fontWeight={"semibold"} size={"title3"}>
                            Add a Tag
                        </Text>
                    </Center>
                    <Formik initialValues={initialValues} onSubmit={onSubmitCreateTag}>
                        {({ values, handleChange, errors, touched, submitForm, isSubmitting }) => (
                            <HStack space="5" paddingBottom={"10px"}>
                                <FormControl isInvalid={!!(errors.tag && touched.tag)} style={styles.tagForm}>
                                    <Input
                                        value={values.tag}
                                        onChangeText={handleChange("tag")}
                                        placeholder="For e.g., Trip"
                                        maxLength={20}
                                        keyboardType={"ascii-capable"}
                                        onSubmitEditing={submitForm}
                                        enablesReturnKeyAutomatically={true}
                                        autoFocus={true}
                                        ref={(input) => {
                                            isSubmitting && input?.focus();
                                        }}
                                        testID="addTagInput"
                                    />
                                    <FormControl.ErrorMessage>{errors.tag}</FormControl.ErrorMessage>
                                </FormControl>
                            </HStack>
                        )}
                    </Formik>
                </VStack>

                {newTags.length != 0 && (
                    <KeyboardAwareScrollView>
                        <TagsGallery title={"Tags Added"} tags={newTags} styles={{ marginTop: 40 }} />
                    </KeyboardAwareScrollView>
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
    tagForm: {
        marginRight: "auto",
        flex: 1,
    },
});
