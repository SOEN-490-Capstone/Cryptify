import React from "react";
import { SettingsStackScreenProps } from "../../types";
import { View } from "../../components/Themed";
import { Alert, StyleSheet } from "react-native";
import ContactsForm, { CreateContactRequestPayload, handleErrors } from "../../components/contacts/ContactsForm";
import {Button, Link, ScrollView, VStack} from "native-base";
import { ContactsGateway } from "../../gateways/contacts_gateway";
import { AuthContext } from "../../components/contexts/AuthContext";
import { FormikProps } from "formik";
import { FormikHelpers } from "formik/dist/types";
import { UpdateContactRequest } from "@cryptify/common/src/requests/update_contact_request";
import { equals } from "@cryptify/common/src/utils/function_utils";

export default function EditContactScreen(props: SettingsStackScreenProps<"EditContactScreen">) {
    const contactsGateway = new ContactsGateway();

    const { token, user } = React.useContext(AuthContext);

    const formikRef = React.useRef<FormikProps<any>>(null);

    React.useEffect(() => {
        (() => {
            props.navigation.setOptions({
                headerRight: () => (
                    <Link
                        _text={{ color: formikRef.current?.dirty ? "darkBlue.500" : "rgba(64, 64, 64, 0.4)" }}
                        isUnderlined={false}
                        onPress={() =>
                            onPress(
                                formikRef.current?.values,
                                formikRef.current as FormikHelpers<CreateContactRequestPayload>,
                            )
                        }
                        testID="editContactButton"
                    >
                        Done
                    </Link>
                ),
                headerLeft: () => (
                    <Link
                        _text={{ color: "darkBlue.500", fontWeight: "400" }}
                        isUnderlined={false}
                        onPress={() => props.navigation.goBack()}
                        testID="cancelEditContactButton"
                    >
                        Cancel
                    </Link>
                ),
            });
        })();
    });

    async function onPress(values: CreateContactRequestPayload, helpers: FormikHelpers<CreateContactRequestPayload>) {
        const hasError = handleErrors(values, helpers);
        if (hasError) {
            return;
        }

        try {
            const walletAddrs = [...values.ethWallets, ...values.btcWallets].filter((addr) => addr.length !== 0);
            const contact = props.route.params.contact;

            const req = {
                userId: user.id,
                contactName: contact.contactName,
            } as UpdateContactRequest;

            if (values.contactName !== contact.contactName) {
                req["newName"] = values.contactName;
            }

            const currentAddresses = contact.addresses.map((addr) => addr.walletAddress);
            if (!equals(walletAddrs, currentAddresses)) {
                req["walletAddrs"] = walletAddrs;
            }

            const updatedContact = await contactsGateway.updateContact(req, token);
            props.route.params.setContact(updatedContact);

            props.navigation.goBack();
        } catch (error) {
            if (error instanceof Error) {
                helpers.setFieldError("contactName", error.message);
            }
        }
    }

    function handleDeleteContact(): void {
        Alert.alert("Do you want to delete this contact?", "You cannot undo this action.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    await contactsGateway.deleteContact(
                        { id: user.id, name: props.route.params.contact.contactName },
                        token,
                    );
                    props.navigation.goBack();
                    props.navigation.goBack();
                },
            },
        ]);
    }

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                <VStack space={"35px"} paddingTop={"30px"} paddingBottom={"10px"}>
                    <ContactsForm
                        prefilledWalletAddress={undefined}
                        contact={props.route.params.contact}
                        setContact={props.route.params.setContact}
                        formikRef={formikRef}
                        navigation={props.navigation}
                    />
                    <Button
                        variant="outline"
                        _text={{ color: "error.500" }}
                        onPress={handleDeleteContact}
                        testID="deleteContactButton"
                    >
                        Delete contact
                    </Button>
                </VStack>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: 15,
    },
});
