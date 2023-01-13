import React from "react";
import { SettingsStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { FieldArray, Formik, FormikErrors, FormikHelpers } from "formik";
import { Button, FormControl, HStack, Input, ScrollView, Text } from "native-base";
import Collapsible from "react-native-collapsible";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBitcoin } from "../components/icons/brands/faBitcoin";
import { farChevronUp } from "../components/icons/regular/farChevronUp";
import { farChevronDown } from "../components/icons/regular/farChevronDown";
import { falCircleXMark } from "../components/icons/light/falCircleXMark";
import { fasCirclePlusSolid } from "../components/icons/solid/fasCirclePlusSolid";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { faEthereum } from "../components/icons/brands/faEthereum";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import { ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY } from "@cryptify/common/src/errors/error_messages";
import { ContactsGateway } from "../gateways/contacts_gateway";
import { AuthContext } from "../components/contexts/AuthContext";

export default function AddContactScreen(props: SettingsStackScreenProps<"ContactsSettingsScreen">) {

    const contactsGateway = new ContactsGateway();

    const { token, user } = React.useContext(AuthContext);

    type IValue = {
        contactName: string;
        ethWallets: string[];
        btcWallets: string[];
    };

    const initialValues: IValue = {
        contactName: "",
        ethWallets: [],
        btcWallets: [],
    };

    type addWalletFieldArrayProps = {
        values: IValue;
        handleChange: any;
        currencyType: CurrencyType;
        errors: FormikErrors<IValue>;
    };

    function AddWalletFieldArray({ values, handleChange, currencyType, errors }: addWalletFieldArrayProps) {
        const wallets = currencyType === CurrencyType.BITCOIN ? values.btcWallets : values.ethWallets;
        const walletListString = currencyType === CurrencyType.BITCOIN ? "btcWallets" : "ethWallets";
        const currencyIcon = currencyType === CurrencyType.BITCOIN ? faBitcoin : faEthereum;
        const iconColor = currencyType === CurrencyType.BITCOIN ? "#F7931A" : "#3C3C3D";

        const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);

        return (
            <>
                <Pressable
                    onPress={() => {
                        setIsCollapsed(!isCollapsed);
                    }}
                >
                    <HStack style={{ marginTop: 40 }}>
                        <FontAwesomeIcon style={{ marginRight: 10 }} color={iconColor} icon={currencyIcon} size={26} />
                        <Text fontWeight={"semibold"} size={"title3"}>
                            {titleCase(currencyType)} Wallets
                        </Text>
                        {isCollapsed ? (
                            <FontAwesomeIcon style={styles.chevronIcon} size={18} icon={farChevronUp} />
                        ) : (
                            <FontAwesomeIcon style={styles.chevronIcon} icon={farChevronDown} size={18} />
                        )}
                    </HStack>
                </Pressable>
                {/* @ts-expect-error this is a known type error in the dependency a pr was made to address the issue but never merged */}
                <Collapsible collapsed={isCollapsed}>
                    <FieldArray
                        name={walletListString}
                        render={(arrayHelpers) => (
                            <View>
                                {wallets.map((wallet, i) => (
                                    <View style={{ marginTop: 20 }} key={i}>
                                        <Input
                                            value={wallet}
                                            onChangeText={handleChange(`${walletListString}[${i}]`)}
                                            rightElement={
                                                <Pressable
                                                    onPress={() => {
                                                        console.log(values);
                                                        arrayHelpers.remove(i);
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        color={"#EF4444"}
                                                        style={{ marginRight: 12 }}
                                                        size={20}
                                                        icon={falCircleXMark}
                                                    />
                                                </Pressable>
                                            }
                                        />
                                        <FormControl.ErrorMessage>{`${walletListString}[${i}]`}</FormControl.ErrorMessage>
                                    </View>
                                ))}
                                <View>
                                    <Pressable
                                        onPress={() => {
                                            arrayHelpers.push("");
                                        }}
                                    >
                                        <HStack style={{ marginTop: 14 }}>
                                            <FontAwesomeIcon color={"#0077E6"} icon={fasCirclePlusSolid} size={20} />
                                            <Text
                                                style={{ marginLeft: 10 }}
                                                color={"darkBlue.500"}
                                                fontWeight={"semibold"}
                                            >
                                                Add another {titleCase(currencyType)} wallet
                                            </Text>
                                        </HStack>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    />
                </Collapsible>
            </>
        );
    }

    async function onAddContactSubmit(values: IValue, formikHelpers: FormikHelpers<IValue>) {

        if(values.contactName.length < 2){
            console.log("should show error");
            formikHelpers.setFieldError("contactName", "test error.");
        }

        values.btcWallets.map((walletAddress, i) => {
            try
            {
                if(walletAddress.length > 0){
                    const isAddressValid = CurrencyType.BITCOIN === getCurrencyType(walletAddress);
                    if(!isAddressValid){
                        formikHelpers.setFieldError(`btcWallets[${i}]`, ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY(titleCase(CurrencyType.BITCOIN)).split(":")[1]);
                        return;
                    }
                }
            } catch(e){
                console.log(`btcWallets[${i}]`)
                formikHelpers.setFieldError(`btcWallets[${i}]`, ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY(titleCase(CurrencyType.BITCOIN)).split(":")[1])
                return;
            }
        })

        try {
            await contactsGateway.createContact({userId: user.id , ...values}, token);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                formikHelpers.setFieldError("contactName", error.message);
            }
        }
    }

    return (
        <View style={styles.view}>
            <Formik initialValues={initialValues} onSubmit={onAddContactSubmit}>
                {({ values, errors, handleChange, submitForm }) => (
                    <FormControl style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <Input
                                value={values.contactName}
                                onChangeText={handleChange("contactName")}
                                placeholder="Name"
                                maxLength={20}
                                keyboardType={"ascii-capable"}
                                testID="contactNameInput"
                            />
                            <FormControl.ErrorMessage>{errors.contactName}</FormControl.ErrorMessage>
                            <AddWalletFieldArray
                                values={values}
                                handleChange={handleChange}
                                currencyType={CurrencyType.BITCOIN}
                                errors={errors}
                            />
                            <AddWalletFieldArray
                                values={values}
                                handleChange={handleChange}
                                currencyType={CurrencyType.ETHEREUM}
                                errors={errors}
                            />

                            <Button
                                style={
                                    values.contactName.length > 0 ? styles.addContactButton : styles.addContactButtonDisabled
                                }
                                onPress={submitForm}
                            >
                                Add Contact
                            </Button>
                        </ScrollView>
                    </FormControl>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 15,
    },
    chevronIcon: {
        marginLeft: "auto",
        marginRight: 5,
    },
    addContactButton: {
        marginTop: "auto",
    },
    addContactButtonDisabled: {
        marginTop: "auto",
        opacity: 0.6,
    },
});
