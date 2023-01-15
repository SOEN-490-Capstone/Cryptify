import React from "react";
import { View } from "../components/Themed";
import { Badge, Center, FormControl, HStack, Input, Pressable, Text, VStack } from "native-base";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AuthContext } from "../components/contexts/AuthContext";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { TagsGateway } from "../gateways/tags_gateway";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { HomeStackScreenProps } from "../types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farPlus } from "../components/icons/regular/farPlus";
import SortService from "../services/sort_service";

export default function AddTransactionTagsScreen(props: HomeStackScreenProps<"AddTransactionTagsScreen">) {
    const tagsGateway = new TagsGateway();

    const transaction = props.route.params.transaction;
    const { token, user } = React.useContext(AuthContext);

    const formikRef = React.useRef<FormikProps<any>>(null);

    const [transactionTags, setTransactionTags] = React.useState<TransactionTag[]>([
        ...props.route.params.transactionTags,
    ]);
    const [suggestedTags, setSuggestedTags] = React.useState<TransactionTag[]>([]);
    const [transactionTagsNotAdded, setTransactionTagsNotAdded] = React.useState<TransactionTag[]>([
        ...props.route.params.transactionTagsNotAdded,
    ]);
    const [isSuggestionTagsAvailable, setIsSuggestionTagsAvailable] = React.useState<boolean>(false);

    const initialValues = {
        tag: "",
    };

    function tagSuggestions(text: string) {
        if (text.length === 0) {
            setSuggestedTags([]);
            return;
        }

        const alreadyAdded = transactionTags.filter((tag) => tag.tagName.toLowerCase() === text.toLowerCase());
        setIsSuggestionTagsAvailable(alreadyAdded.length === 0);

        if (alreadyAdded.length) {
            setSuggestedTags(alreadyAdded);
        } else {
            const suggested = transactionTagsNotAdded.filter(
                (val) => val.tagName?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1,
            );
            setSuggestedTags(suggested);
        }
    }

    async function addTransactionTag(tag: TransactionTag): Promise<void> {
        const updatedTag = await tagsGateway.updateTag(
            {
                userId: user.id,
                currentName: tag.tagName,
                newName: undefined,
                addTransactions: [transaction.id],
                removeTransactions: undefined,
            },
            token,
        );

        updateTagStates(updatedTag);
        formikRef.current?.resetForm();
    }

    async function onSubmitCreateTag(values: any, formikHelpers: FormikHelpers<any>): Promise<void> {
        const isSuggested = suggestedTags.find((t) => t.tagName.toLowerCase() === values.tag.toLowerCase());

        if (isSuggested) {
            return;
        }

        try {
            const createdTag = await tagsGateway.createTags(
                {
                    tagName: values.tag,
                    userId: user.id,
                    transactionIds: [transaction.id],
                },
                token,
            );

            updateTagStates(createdTag);
            formikHelpers.resetForm();
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("tag", error.message);
            }
        }
    }

    function updateTagStates(addTag: TransactionTag): void {
        const updatedTransactionsNotAdded = transactionTagsNotAdded.filter((t) => t.tagName !== addTag.tagName);
        const updatedTransactionTags = [...transactionTags, addTag];

        props.route.params.setTransaction({ ...transaction, tags: updatedTransactionTags });
        props.route.params.setTransactionTags(updatedTransactionTags);
        props.route.params.setTransactionTagsNotAdded(updatedTransactionsNotAdded);

        // Assume newlyCreatedTag once added to transactionTags will result in 10 tags added
        if (transactionTags.length === 9) {
            props.navigation.goBack();
        }

        setTransactionTags(updatedTransactionTags);
        setTransactionTagsNotAdded(updatedTransactionsNotAdded);
        setSuggestedTags([]);
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.view}>
                <VStack space={"35px"} style={styles.addTag}>
                    <Center>
                        <Text fontWeight={"semibold"} size={"title3"}>
                            Add a Tag
                        </Text>
                    </Center>
                    <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onSubmitCreateTag}>
                        {({ values, setFieldValue, errors, touched, submitForm, isSubmitting }) => (
                            <HStack space="5" paddingBottom={"10px"}>
                                <FormControl isInvalid={!!(errors.tag && touched.tag)} style={styles.tagForm}>
                                    <Input
                                        value={values.tag}
                                        onChangeText={(text) => {
                                            setFieldValue("tag", text);
                                            tagSuggestions(text);
                                        }}
                                        placeholder="For e.g., Trip"
                                        maxLength={20}
                                        keyboardType={"ascii-capable"}
                                        onSubmitEditing={submitForm}
                                        enablesReturnKeyAutomatically={true}
                                        autoFocus={true}
                                        ref={(input) => {
                                            isSubmitting && input?.focus();
                                        }}
                                        testID="newTagInput"
                                    />
                                    <FormControl.ErrorMessage>{errors.tag}</FormControl.ErrorMessage>
                                </FormControl>
                            </HStack>
                        )}
                    </Formik>
                </VStack>

                {/* Suggested Tags */}
                <KeyboardAwareScrollView style={styles.scrollView} keyboardShouldPersistTaps={"handled"}>
                    {suggestedTags.length != 0 && (
                        <VStack space={"20px"} style={styles.suggestions}>
                            <Text size={"subheadline"} color={"text.500"} textAlign={"center"}>
                                {isSuggestionTagsAvailable
                                    ? "Here are some suggestions you can use for tagging this transaction."
                                    : "A similar existing tag is already associated with this transaction."}
                            </Text>
                            <HStack style={styles.suggestedTags}>
                                {suggestedTags.map((tag, i) => (
                                    // TODO create a component and use it for both tags list
                                    <Pressable
                                        onPress={() => {
                                            if (isSuggestionTagsAvailable) {
                                                addTransactionTag(tag);
                                            }
                                        }}
                                        rounded="md"
                                        backgroundColor="gray.100"
                                        style={styles.suggestedBadge}
                                        key={i}
                                    >
                                        <HStack space={"10px"} style={styles.badgeContent}>
                                            <Text size={"subheadline"} fontWeight={"semibold"}>
                                                {tag.tagName}
                                            </Text>
                                            {isSuggestionTagsAvailable && (
                                                <FontAwesomeIcon icon={farPlus} size={14} color="#404040" />
                                            )}
                                        </HStack>
                                    </Pressable>
                                ))}
                            </HStack>
                        </VStack>
                    )}

                    {/* Tags Added */}
                    {transactionTags.length != 0 && (
                        <>
                            <VStack space={"20px"} style={styles.tagsAdded}>
                                <Text fontWeight={"semibold"} size={"title3"}>
                                    Tags Added
                                </Text>

                                <HStack flexWrap={"wrap"}>
                                    {transactionTags.length != 0 && (
                                        <>
                                            {SortService.sortTransactionTagsAlphabetically(transactionTags).map(
                                                (tag, i) => (
                                                    // TODO create a component and use it for both tags list
                                                    <Badge
                                                        rounded="md"
                                                        backgroundColor="gray.100"
                                                        style={styles.badge}
                                                        px={"15px"}
                                                        py={"8px"}
                                                        key={i}
                                                    >
                                                        <HStack space={"10px"} style={styles.badgeContent}>
                                                            <Text size={"subheadline"} fontWeight={"semibold"}>
                                                                {tag.tagName}
                                                            </Text>
                                                        </HStack>
                                                    </Badge>
                                                ),
                                            )}
                                        </>
                                    )}
                                </HStack>
                            </VStack>
                        </>
                    )}
                </KeyboardAwareScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: 30,
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    addTag: {
        alignItems: "center",
        justifyContent: "center",
    },
    badge: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 13,
        marginBottom: 13,
        justifyContent: "center",
    },
    suggestedBadge: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 6.5,
        marginLeft: 6.5,
        marginBottom: 13,
        justifyContent: "center",
    },
    badgeContent: {
        alignItems: "center",
    },
    tagForm: {
        marginRight: "auto",
        flex: 1,
        paddingHorizontal: 15,
    },
    tagsAdded: {
        marginTop: 40,
        paddingBottom: 15,
        marginBottom: -13,
    },
    suggestions: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: -13,
    },
    suggestedTags: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
