import React from "react";
import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { titleCase } from "@cryptify/common/src/helpers/string_utils";
import { TitleTextWithIcon } from "../../components/TitleTextWithIcon";
import { Formik } from "formik";
import { Button, FormControl, Input, VStack } from "native-base";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";
import { FormikHelpers } from "formik/dist/types";
import StorageService from "../../services/storage_service";
import { currenciesDisplayData } from "../../constants/CurrenciesDisplayData";
import WalletsGateway from "../../gateways/wallets_gateway";
import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import UsersGateway from "../../gateways/users_gateway";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { AddWalletStatus } from "./add_wallet_status";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";

type Props = {
    currencyType: CurrencyType;
    setStatus: React.Dispatch<React.SetStateAction<AddWalletStatus>>;
    setWallet: React.Dispatch<React.SetStateAction<WalletWithBalance | null>>;
};

export default function AddWalletFormScreen({ currencyType, setStatus, setWallet }: Props) {
    const initialValues: CreateWalletRequest = {
        userId: 0,
        address: "",
        name: "",
        currencyType,
    };

    async function onSubmitCreateWallet(
        values: CreateWalletRequest,
        formikHelpers: FormikHelpers<CreateWalletRequest>,
    ): Promise<void> {
        try {
            setStatus(AddWalletStatus.LOADING);
            // Artificial delay before processing actually happens, what has
            // the world come too :(
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const token = await StorageService.get<JwtToken>("@jwt");
            const user = await UsersGateway.whoami(token!);
            const wallet = await WalletsGateway.createWallet(
                {
                    ...values,
                    userId: user.id,
                },
                token!,
            );
            setWallet(wallet);

            formikHelpers.resetForm();
            setStatus(AddWalletStatus.SUCCESS);
        } catch (error) {
            console.log(error);
            setStatus(AddWalletStatus.ERROR);
        }
    }

    const displayData = currenciesDisplayData.find((currency) => currency.type == currencyType)!;
    const buttonText = `Add ${titleCase(currencyType)} Wallet`;

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
                            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!(errors.address && touched.address)}>
                            <Input
                                value={values.address}
                                onChangeText={handleChange("address")}
                                placeholder={displayData.addressInput}
                            />
                            <FormControl.ErrorMessage>{errors.address}</FormControl.ErrorMessage>
                        </FormControl>
                        <Button
                            style={styles.addWalletFormButton}
                            _text={styles.addWalletFormButtonText}
                            onPress={submitForm}
                        >
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
