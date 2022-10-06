import React from "react";
import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { faBitcoinCustom } from "../../components/icons/faBitcoinCustom";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../../types";
import { titleCase } from "@cryptify/common/src/helpers/string_utils";
import { CompositeScreenProps } from "@react-navigation/native";
import { TitleTextWithIcon } from "../../components/TitleTextWithIcon";
import {Formik} from "formik";
import {signInSchema} from "@cryptify/common/src/validations/sign_in_schema";
import {Button, FormControl, Input, Pressable, VStack} from "native-base";
import {ERROR_NOP} from "@cryptify/common/src/errors/error_messages";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEyeCustom} from "../../components/icons/faEyeCustom";
import {faEyeSlashCustom} from "../../components/icons/faEyeSlashCustom";
import {CreateWalletRequest} from "@cryptify/common/src/requests/create_wallet_request";
import {createWalletSchema} from "@cryptify/common/src/validations/create_wallet_schema";
import {SignInRequest} from "@cryptify/common/src/requests/sign_in_request";
import {FormikHelpers} from "formik/dist/types";
import AuthGateway from "../../gateways/auth_gateway";
import StorageService from "../../services/storage_service";
import {KEY_JWT} from "../../constants/storage_keys";
import {CurrencyType} from "@cryptify/common/src/domain/currency_type";
import {faEthereumCustom} from "../../components/icons/faEthereumCustom";
import {currenciesDisplayData} from "../../constants/CurrenciesDisplayData";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"AddWalletFormScreen">,
    SettingsStackScreenProps<"AddWalletFormScreen">
>;

export default function AddWalletFormScreen({ route }: Props) {
    const currencyType = route.params.currencyType;

    const initialValues: CreateWalletRequest = {
        userId: 0,
        address: "",
        name: "",
        currencyType,
    };

    async function onSubmitCreateWallet(values: CreateWalletRequest, formikHelpers: FormikHelpers<CreateWalletRequest>): Promise<void> {
        console.log(values);
    }

    const displayData = currenciesDisplayData.find((currency) => currency.type == currencyType)!!;
    const buttonText = `Add ${titleCase(currencyType)} Wallet`

    return (
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
            <Formik initialValues={initialValues} validationSchema={createWalletSchema} onSubmit={onSubmitCreateWallet}>
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <VStack space="13" style={styles.addWalletForm}>
                        <FormControl isInvalid={!!(errors.name && touched.name)}>
                            <Input value={values.name} onChangeText={handleChange("name")} placeholder="Name" />
                            <FormControl.ErrorMessage>
                                {errors.name}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!(errors.address && touched.address)}>
                            <Input value={values.address} onChangeText={handleChange("address")} placeholder={displayData.addressInput} />
                            <FormControl.ErrorMessage>
                                {errors.address}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <Button style={styles.addWalletFormButton} _text={styles.addWalletFormButtonText} onPress={submitForm}>
                            {buttonText}
                        </Button>
                    </VStack>
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
    title: {
        fontSize: 20,
        lineHeight: 27,
    },
    addWalletForm: {
        marginTop: 30,
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
