import React from "react";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../../types";
import { View } from "../../components/Themed";
import { FieldArray, Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import { Button, FormControl, HStack, Input, ScrollView, Text } from "native-base";
import Collapsible from "react-native-collapsible";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBitcoin } from "../../components/icons/brands/faBitcoin";
import { farChevronUp } from "../../components/icons/regular/farChevronUp";
import { farChevronDown } from "../../components/icons/regular/farChevronDown";
import { falCircleXMark } from "../../components/icons/light/falCircleXMark";
import { fasCirclePlusSolid } from "../../components/icons/solid/fasCirclePlusSolid";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { faEthereum } from "../../components/icons/brands/faEthereum";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { getCurrencyType, isValidCurrencyAddress } from "@cryptify/common/src/utils/currency_utils";
import { ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY } from "@cryptify/common/src/errors/error_messages";
import { ContactsGateway } from "../../gateways/contacts_gateway";
import { AuthContext } from "../../components/contexts/AuthContext";
import { CreateContactRequest } from "@cryptify/common/src/requests/create_contact_request";
import { CompositeScreenProps } from "@react-navigation/native";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"AddContactScreen">,
    SettingsStackScreenProps<"AddContactScreen">
>;

export default function AddContactScreen(props: Props) {
    const contactsGateway = new ContactsGateway();

    const { token, user } = React.useContext(AuthContext);

    const defaultEthWallets = isValidCurrencyAddress(
        props.route.params?.prefilledWalletAddress || "",
        CurrencyType.ETHEREUM,
    )
        ? [props.route.params.prefilledWalletAddress]
        : [];
    const defaultBtcWallets = isValidCurrencyAddress(
        props.route.params?.prefilledWalletAddress || "",
        CurrencyType.BITCOIN,
    )
        ? [props.route.params.prefilledWalletAddress]
        : [];

    const initialValues: CreateContactRequest = {
        contactName: "",
        userId: user.id,
        ethWallets: defaultEthWallets,
        btcWallets: defaultBtcWallets,
    };

    function AddWalletFieldArray({
        values,
        handleChange,
        currencyType,
        errors,
        touched,
        placeholder,
    }: AddWalletFieldArrayProps) {
        const currencyIcon = currencyType === CurrencyType.BITCOIN ? faBitcoin : faEthereum;
        const iconColor = currencyType === CurrencyType.BITCOIN ? "#F7931A" : "#3C3C3D";

        const wallets = currencyType === CurrencyType.BITCOIN ? values.btcWallets : values.ethWallets;
        const currencyErrors = currencyType === CurrencyType.BITCOIN ? errors.btcWallets : errors.ethWallets;
        const currencyTouched = currencyType === CurrencyType.BITCOIN ? touched.btcWallets : touched.ethWallets;
        const walletListString = currencyType === CurrencyType.BITCOIN ? "btcWallets" : "ethWallets";

        const [isCollapsed, setIsCollapsed] = React.useState<boolean>(!props.route.params?.prefilledWalletAddress);

        return (
            <>
                <Pressable
                    onPress={() => {
                        setIsCollapsed(!isCollapsed);
                    }}
                    testID="walletCollapsibleButton"
                >
                    <HStack style={{ marginTop: 40 }}>
                        <FontAwesomeIcon style={{ marginRight: 10 }} color={iconColor} icon={currencyIcon} size={26} />
                        <Text fontWeight={"semibold"} size={"title3"}>
                            {titleCase(currencyType)} Wallets
                        </Text>
                        {isCollapsed ? (
                            <FontAwesomeIcon style={styles.chevronIcon} size={18} icon={farChevronDown} />
                        ) : (
                            <FontAwesomeIcon style={styles.chevronIcon} icon={farChevronUp} size={18} />
                        )}
                    </HStack>
                </Pressable>
                {/* @ts-expect-error this is a known type error in the dependency a pr was made to address the issue but never merged */}
                <Collapsible collapsed={isCollapsed}>
                    <FieldArray
                        name={walletListString}
                        render={(arrayHelpers) => (
                            <View>
                                {wallets?.map((wallet, i) => (
                                    <View style={wallets.length > 1 ? { marginTop: 13 } : { marginTop: 20 }} key={i}>
                                        <FormControl
                                            isInvalid={
                                                !!(currencyErrors ? currencyErrors[i] : false && currencyTouched)
                                            }
                                        >
                                            <Input
                                                value={wallet}
                                                onChangeText={handleChange(`${walletListString}[${i}]`)}
                                                placeholder={placeholder}
                                                rightElement={
                                                    !props.route.params?.prefilledWalletAddress ? (
                                                        <Pressable
                                                            onPress={() => {
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
                                                    ) : (
                                                        <></>
                                                    )
                                                }
                                                isDisabled={!!props.route.params?.prefilledWalletAddress}
                                                testID="walletAddressInput"
                                            />
                                            <FormControl.ErrorMessage>
                                                {currencyErrors ? currencyErrors[i] : ""}
                                            </FormControl.ErrorMessage>
                                        </FormControl>
                                    </View>
                                ))}
                                {!props.route.params?.prefilledWalletAddress && (
                                    <View>
                                        <Pressable
                                            onPress={() => {
                                                arrayHelpers.push("");
                                            }}
                                            testID={`addAnother${currencyType}`}
                                        >
                                            <HStack style={{ marginTop: 13 }}>
                                                <FontAwesomeIcon
                                                    color={"#0077E6"}
                                                    icon={fasCirclePlusSolid}
                                                    size={20}
                                                />
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
                                )}
                            </View>
                        )}
                    />
                </Collapsible>
            </>
        );
    }

    async function onAddContactSubmit(
        values: CreateContactRequest,
        formikHelpers: FormikHelpers<CreateContactRequest>,
    ) {
        const currencies = [CurrencyType.BITCOIN, CurrencyType.ETHEREUM];
        let hasError = false;

        // checking for errors for each currency in the list
        currencies.map((currencyType) => {
            const wallets = currencyType === CurrencyType.BITCOIN ? values.btcWallets : values.ethWallets;
            const walletListString = currencyType === CurrencyType.BITCOIN ? "btcWallets" : "ethWallets";

            // validating each string to be a valid currency wallet
            wallets?.map((walletAddress, i) => {
                // ignoring empty strings
                if (walletAddress !== undefined && walletAddress.length > 0) {
                    const isAddressValid = isValidCurrencyAddress(walletAddress, currencyType);
                    if (!isAddressValid) {
                        formikHelpers.setFieldError(
                            `${walletListString}[${i}]`,
                            ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY(titleCase(currencyType)).split(":")[1],
                        );
                        hasError = true;
                        return;
                    }
                }
            });
        });

        try {
            if (hasError) {
                return;
            }

            const requestValues = { ...values };
            requestValues.btcWallets = requestValues.btcWallets?.filter((w) => w !== "");
            requestValues.ethWallets = requestValues.ethWallets?.filter((w) => w !== "");

            await contactsGateway.createContacts(requestValues, token);
            props.navigation.goBack();
            if (props.route.params?.prefilledWalletAddress) {
                props.navigation.goBack();
            }
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("contactName", error.message);
            }
        }
    }

    return (
        <View style={styles.view}>
            <Formik initialValues={initialValues} onSubmit={onAddContactSubmit}>
                {({ values, errors, touched, handleChange, submitForm }) => (
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <FormControl isInvalid={!!(errors.contactName && touched.contactName)}>
                            <Input
                                value={values.contactName}
                                autoFocus={true}
                                onChangeText={handleChange("contactName")}
                                placeholder="Name"
                                maxLength={20}
                                keyboardType={"ascii-capable"}
                                testID="contactNameInput"
                            />
                            <FormControl.ErrorMessage>{errors.contactName}</FormControl.ErrorMessage>
                        </FormControl>
                        {!props.route.params?.prefilledWalletAddress ? (
                            <>
                                <AddWalletFieldArray
                                    values={values}
                                    handleChange={handleChange}
                                    currencyType={CurrencyType.BITCOIN}
                                    errors={errors}
                                    touched={touched}
                                    placeholder={"Wallet address (Begins with 1, 3, or bc1)"}
                                />
                                <AddWalletFieldArray
                                    values={values}
                                    handleChange={handleChange}
                                    currencyType={CurrencyType.ETHEREUM}
                                    errors={errors}
                                    touched={touched}
                                    placeholder={"Wallet address (Begins with 0x)"}
                                />
                            </>
                        ) : (
                            <AddWalletFieldArray
                                values={values}
                                handleChange={handleChange}
                                currencyType={getCurrencyType(props.route.params?.prefilledWalletAddress)}
                                errors={errors}
                                touched={touched}
                            />
                        )}
                        <Button
                            style={
                                values.contactName.length > 0
                                    ? styles.addContactButton
                                    : styles.addContactButtonDisabled
                            }
                            onPress={submitForm}
                            testID="submitCreateContactButton"
                        >
                            Add Contact
                        </Button>
                    </ScrollView>
                )}
            </Formik>
        </View>
    );
}

type AddWalletFieldArrayProps = {
    values: CreateContactRequest;
    handleChange: any;
    currencyType: CurrencyType;
    errors: FormikErrors<CreateContactRequest>;
    touched: FormikTouched<CreateContactRequest>;
    placeholder?: string;
};

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
