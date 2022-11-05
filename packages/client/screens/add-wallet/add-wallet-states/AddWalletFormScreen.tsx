import React from "react";
import { View } from "../../../components/Themed";
import { StyleSheet } from "react-native";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { TitleTextWithIcon } from "../../../components/TitleTextWithIcon";
import { Formik, FormikErrors } from "formik";
import { Button, FormControl, Input, VStack } from "native-base";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";
import { FormikHelpers } from "formik/dist/types";
import { currenciesDisplayData } from "../../../constants/CurrenciesDisplayData";
import { WalletsGateway } from "../../../gateways/wallets_gateway";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { AddWalletState } from "./add_wallet_state";
import NotFoundScreen from "../../NotFoundScreen";
import { HttpError } from "@cryptify/common/src/errors/http_error";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import { ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY } from "@cryptify/common/src/errors/error_messages";
import { AuthContext } from "../../../components/contexts/AuthContext";

type Props = {
    currencyType: CurrencyType;
    setState: React.Dispatch<React.SetStateAction<AddWalletState>>;
    setWalletName: React.Dispatch<React.SetStateAction<string>>;
    initialValues: CreateWalletRequest;
    setInitialValues: React.Dispatch<React.SetStateAction<CreateWalletRequest>>;
    initialErrors: FormikErrors<any>;
    setInitialErrors: React.Dispatch<React.SetStateAction<FormikErrors<any>>>;
};

export default function AddWalletFormScreen({
    currencyType,
    setState,
    setWalletName,
    initialValues,
    setInitialValues,
    initialErrors,
    setInitialErrors,
}: Props) {
    const walletsGateway = new WalletsGateway();

    const { token, user } = React.useContext(AuthContext);

    async function onSubmitCreateWallet(
        values: CreateWalletRequest,
        formikHelpers: FormikHelpers<CreateWalletRequest>,
    ): Promise<void> {
        try {
            const isAddressValid = values.currencyType === getCurrencyType(values.address);
            if (!isAddressValid) {
                const [field, message] = ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY(
                    titleCase(values.currencyType),
                ).split(":");
                formikHelpers.setFieldError(field, message);
                return;
            }

            // On submit set the initial values so that if the form is re-rendered on an error
            // the previously inputted values are there
            setInitialValues(values);
            setState(AddWalletState.LOADING);
            setWalletName(values.name);

            // Artificial delay before processing actually happens, what has
            // the world come too :(
            await new Promise((resolve) => setTimeout(resolve, 2000));

            await walletsGateway.createWallet(
                {
                    ...values,
                    userId: user.id,
                },
                token,
            );

            // Reset the initial errors to empty in case the user had an error before
            // and goes to add a new wallet, this won't be covered by resetting the form
            // since the error state is managed outside formik
            setInitialErrors({});
            setInitialValues({
                userId: 0,
                address: "",
                name: "",
                currencyType,
            });
            formikHelpers.resetForm();
            setState(AddWalletState.SUCCESS);
        } catch (error) {
            // If the error is a 400 bad request set the initial form errors
            // and update the state to re-render the form with the previous
            // values and errors
            if (error instanceof HttpError && error.status == 400) {
                const [field, message] = error.message.split(":");
                setInitialErrors({
                    [field]: message,
                });
                setState(AddWalletState.FORM);
                return;
            }

            setState(AddWalletState.ERROR);
        }
    }

    const displayData = currenciesDisplayData.find((currency) => currency.type == currencyType);
    if (!displayData) {
        return <NotFoundScreen />;
    }

    const buttonText = `Add ${titleCase(currencyType)} Wallet`;

    return (
        displayData && (
            <View style={styles.view}>
                <TitleTextWithIcon
                    icon={displayData.icon}
                    iconSize={64}
                    iconStyles={styles[displayData.style]}
                    textStyles={styles.title}
                    space={12}
                >
                    {displayData.title}
                </TitleTextWithIcon>
                <Formik
                    initialValues={initialValues}
                    initialErrors={initialErrors}
                    validationSchema={createWalletSchema}
                    onSubmit={onSubmitCreateWallet}
                >
                    {({ values, errors, touched, handleChange, submitForm }) => (
                        <VStack space="13" style={styles.addWalletForm}>
                            <FormControl isInvalid={!!(errors.name && (touched.address || initialValues.name != ""))}>
                                <Input value={values.name} onChangeText={handleChange("name")} placeholder="Name" testID="walletName"/>
                                <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={!!(errors.address && (touched.address || initialValues.address != ""))}
                            >
                                <Input
                                    value={values.address}
                                    onChangeText={handleChange("address")}
                                    placeholder={displayData.addressInput}
                                    testID="walletAddress"
                                />
                                <FormControl.ErrorMessage>{errors.address}</FormControl.ErrorMessage>
                            </FormControl>
                            <Button
                                style={styles.addWalletFormButton}
                                _text={styles.addWalletFormButtonText}
                                onPress={submitForm}
                                testID="submitAddWalletButton"
                            >
                                {buttonText}
                            </Button>
                        </VStack>
                    )}
                </Formik>
            </View>
        )
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    title: {
        fontSize: 20,
        lineHeight: 27,
    },
    addWalletForm: {
        marginTop: 35,
    },
    addWalletFormButton: {
        marginTop: 7,
    },
    addWalletFormButtonText: {
        fontSize: 17,
        lineHeight: 23,
    },
    bitcoinIcon: {
        color: "#F7931A",
    },
    ethereumIcon: {
        color: "#3C3C3D",
    },
});
