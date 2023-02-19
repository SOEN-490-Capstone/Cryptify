import React from "react";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { Button, FormControl, Input, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { getCurrencyType, isValidCurrencyAddress } from "@cryptify/common/src/utils/currency_utils";
import { ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY } from "@cryptify/common/src/errors/error_messages";
import { ContactsGateway } from "../../gateways/contacts_gateway";
import { AuthContext } from "../contexts/AuthContext";
import CollapsibleFormSection from "./CollapsibleFormSection";
import { Contact } from "@cryptify/common/src/domain/entities/contact";
import { CompositeNavigationProp } from "@react-navigation/native";

type Props = {
    contact: Contact | undefined;
    setContact: React.Dispatch<React.SetStateAction<Contact>> | undefined;
    formikRef: React.RefObject<FormikProps<any>> | undefined;
    prefilledWalletAddress: string | undefined;
    navigation: CompositeNavigationProp<any, any>;
};

function getDefaultAddresses(props: Props, type: CurrencyType): string[] {
    if (props.prefilledWalletAddress && isValidCurrencyAddress(props.prefilledWalletAddress, type)) {
        return [props.prefilledWalletAddress];
    } else if (props.contact) {
        return props.contact.addresses
            .map(({ walletAddress }) => walletAddress)
            .filter((addr) => getCurrencyType(addr) === type);
    } else {
        return [];
    }
}

export default function ContactsForm(props: Props) {
    const contactsGateway = new ContactsGateway();

    const { token, user } = React.useContext(AuthContext);

    const initialValues: CreateContactRequestPayload = {
        contactName: props.contact?.contactName || "",
        userId: user.id,
        ethWallets: getDefaultAddresses(props, CurrencyType.ETHEREUM),
        btcWallets: getDefaultAddresses(props, CurrencyType.BITCOIN),
    };

    async function onSubmit(
        values: CreateContactRequestPayload,
        formikHelpers: FormikHelpers<CreateContactRequestPayload>,
    ) {
        const hasError = handleErrors(values, formikHelpers);
        if (hasError) {
            return;
        }

        try {
            const walletAddrs = [...values.ethWallets, ...values.btcWallets].filter((addr) => addr.length !== 0);
            await contactsGateway.createContact(
                {
                    contactName: values.contactName,
                    userId: user.id,
                    walletAddrs,
                },
                token,
            );

            props.navigation.goBack();
            if (props.prefilledWalletAddress) {
                props.navigation.goBack();
            }
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("contactName", error.message);
            }
        }
    }

    return (
        <Formik innerRef={props.formikRef} initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, errors, touched, handleChange, submitForm }) => (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <FormControl isInvalid={!!(errors.contactName && touched.contactName)}>
                        <Input
                            value={values.contactName}
                            autoFocus={!props.contact}
                            onChangeText={handleChange("contactName")}
                            placeholder="Name"
                            maxLength={20}
                            keyboardType={"ascii-capable"}
                            testID="contactNameInput"
                        />
                        <FormControl.ErrorMessage>{errors.contactName}</FormControl.ErrorMessage>
                    </FormControl>
                    {!props.prefilledWalletAddress ? (
                        <>
                            <CollapsibleFormSection
                                values={values}
                                handleChange={handleChange}
                                currencyType={CurrencyType.BITCOIN}
                                errors={errors}
                                touched={touched}
                                placeholder={"Wallet address (Begins with 1, 3, or bc1)"}
                                initialIsCollapsed={!props.contact}
                                isPrefilledAddContact={false}
                            />
                            <CollapsibleFormSection
                                values={values}
                                handleChange={handleChange}
                                currencyType={CurrencyType.ETHEREUM}
                                errors={errors}
                                touched={touched}
                                placeholder={"Wallet address (Begins with 0x)"}
                                initialIsCollapsed={!props.contact}
                                isPrefilledAddContact={false}
                            />
                        </>
                    ) : (
                        <CollapsibleFormSection
                            values={values}
                            handleChange={handleChange}
                            currencyType={getCurrencyType(props.prefilledWalletAddress)}
                            errors={errors}
                            touched={touched}
                            initialIsCollapsed={false}
                            isPrefilledAddContact={true}
                        />
                    )}
                    {!props.contact && (
                        <Button
                            style={styles.addContactButton}
                            isDisabled={values.contactName.length === 0}
                            onPress={submitForm}
                            testID="submitCreateContactButton"
                        >
                            Add Contact
                        </Button>
                    )}
                </ScrollView>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    addContactButton: {
        marginTop: "auto",
    },
});

export type CreateContactRequestPayload = {
    contactName: string;
    userId: number;
    ethWallets: string[];
    btcWallets: string[];
};

export function handleErrors(
    values: CreateContactRequestPayload,
    formikHelpers: FormikHelpers<CreateContactRequestPayload>,
): boolean {
    const currencies = [CurrencyType.BITCOIN, CurrencyType.ETHEREUM];
    let hasError = false;

    // checking for errors for each currency in the list
    currencies.forEach((currencyType) => {
        const wallets = currencyType === CurrencyType.BITCOIN ? values.btcWallets : values.ethWallets;
        const walletListString = currencyType === CurrencyType.BITCOIN ? "btcWallets" : "ethWallets";

        // validating each string to be a valid currency wallet
        wallets?.forEach((walletAddress, i) => {
            // ignoring empty strings
            if (walletAddress !== undefined && walletAddress.length > 0) {
                const isAddressValid = isValidCurrencyAddress(walletAddress, currencyType);
                if (!isAddressValid) {
                    formikHelpers.setFieldError(
                        `${walletListString}[${i}]`,
                        ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY(titleCase(currencyType)).split(":")[1],
                    );
                    hasError = true;
                }
            }
        });
    });

    return hasError;
}
