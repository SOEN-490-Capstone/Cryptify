import React from "react";
import { SettingsStackScreenProps } from "../types";
import { Button, HStack, VStack, Text, FormControl, Input } from "native-base";
import { Alert, Pressable, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { AuthContext } from "../components/contexts/AuthContext";
import { WalletsGateway } from "../gateways/wallets_gateway";
import MultiLineListItem from "../components/list/MultiLineListItem";
import SingleLineListItem from "../components/list/SingleLineListItem";
import WalletDetailsComponent from "../components/WalletDetailsComponent";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { Formik, FormikErrors } from "formik";
import { FormikHelpers } from "formik/dist/types";
import { HttpError } from "@cryptify/common/src/errors/http_error";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { createWalletSchema } from "@cryptify/common/src/validations/create_wallet_schema";

function getBtcFormat(address: string): string {
    if (address.charAt(0) == "1") {
        return "P2PKH";
    } else if (address.charAt(0) == "3") {
        return "P2SH";
    } else if (address.charAt(0) == "b") {
        return "Bech32";
    } else {
        return "";
    }
}

export default function WalletSettingsScreen({ navigation, route }: SettingsStackScreenProps<"WalletSettingsScreen">) {
    const { token, user } = React.useContext(AuthContext);
    const walletsGateway = new WalletsGateway();
    const [isEditEnabled, setIsEditEnabled] = React.useState<boolean>(false);
    const [initialValues, setInitialValues] = React.useState<WalletWithBalance>(route.params.wallet);
    const [initialErrors, setInitialErrors] = React.useState<FormikErrors<any>>({});

    function handleDeleteWallet(): void {
        Alert.alert("Do you want to remove this wallet?", "You cannot undo this action.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: async () => {
                    await walletsGateway.deleteWallet({ id: user.id, address: route.params.wallet.address }, token);
                    navigation.goBack();
                },
            },
        ]);
    }

    function handleEditEnabled(): void {
        setIsEditEnabled(!isEditEnabled);
    }

    async function onSubmitCreateWallet(
        values: WalletWithBalance,
        formikHelpers: FormikHelpers<WalletWithBalance>,
    ): Promise<void> {
        try {
            setInitialValues(values);
            setInitialErrors({});
            setIsEditEnabled(false);
            walletsGateway.updateWallet(values, token);
            formikHelpers.resetForm();
        } catch (error) {
            // If the error is a 400 bad request set the initial form errors
            // and update the state to re-render the form with the previous
            // values and errors
            if (error instanceof HttpError && error.status == 400) {
                const [field, message] = error.message.split(":");
                setInitialErrors({
                    [field]: message,
                });
                return;
            }
        }
    }

    return (
        <View style={styles.view}>
            <VStack space={"30px"}>
                <WalletDetailsComponent wallet={initialValues} />
                <VStack space={"20px"}>
                    {isEditEnabled ? (
                        <>
                            <Formik
                                initialValues={initialValues}
                                initialErrors={initialErrors}
                                validationSchema={createWalletSchema}
                                onSubmit={onSubmitCreateWallet}
                            >
                                {({ values, errors, touched, handleChange, submitForm }) => (
                                    <VStack space="13">
                                        <FormControl
                                            isInvalid={!!(errors.name && (touched.name || initialValues.name != ""))}
                                        >
                                            <Input
                                                value={values.name}
                                                onChangeText={handleChange("name")}
                                                placeholder="Name"
                                            />
                                            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
                                        </FormControl>
                                        <HStack space="15" flexDirection={"row-reverse"}>
                                            <Button paddingX="16px" paddingY="6.5px" onPress={submitForm}>
                                                Save
                                            </Button>
                                            <Button backgroundColor={"white"} onPress={handleEditEnabled}>
                                                <Text color="darkBlue.500" fontWeight={"semibold"}>
                                                    Cancel
                                                </Text>
                                            </Button>
                                        </HStack>
                                    </VStack>
                                )}
                            </Formik>
                        </>
                    ) : (
                        <HStack justifyContent="space-between">
                            <MultiLineListItem label="Name" value={initialValues.name} />
                            <Pressable onPress={handleEditEnabled}>
                                <Text color="darkBlue.500" fontWeight={"semibold"}>
                                    Edit
                                </Text>
                            </Pressable>
                        </HStack>
                    )}
                    <MultiLineListItem label="Address" value={route.params.wallet.address} copy={true} />
                    {route.params.wallet.currencyType === CurrencyType.BITCOIN && (
                        <SingleLineListItem label="Format" value={getBtcFormat(route.params.wallet.address)} />
                    )}
                </VStack>
                <Button
                    variant="outline"
                    _text={{ color: "error.500" }}
                    onPress={handleDeleteWallet}
                    testID="removeWalletButton"
                >
                    Remove wallet
                </Button>
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
    },
});
