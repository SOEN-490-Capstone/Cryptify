import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { faBitcoin } from "../icons/brands/faBitcoin";
import { faEthereum } from "../icons/brands/faEthereum";
import React from "react";
import { StyleSheet } from "react-native";
import { FormControl, HStack, Input, Text, Pressable } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farChevronDown } from "../icons/regular/farChevronDown";
import { farChevronUp } from "../icons/regular/farChevronUp";
import Collapsible from "react-native-collapsible";
import { FieldArray, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import { View } from "../Themed";
import { falCircleXMark } from "../icons/light/falCircleXMark";
import { farCirclePlus } from "../icons/regular/farCirclePlus";
import { QRCodeScannerInputIcon } from "../QRCodeScannerInputIcon";
import { CompositeNavigationProp } from "@react-navigation/native";
import { getCurrencyTypeUILabel } from "@cryptify/common/src/utils/currency_utils";

type CreateContactRequestPayload = {
    contactName: string;
    userId: number;
    ethWallets: string[];
    btcWallets: string[];
};

type AddWalletFieldArrayProps = {
    values: CreateContactRequestPayload;
    handleChange: any;
    currencyType: CurrencyType;
    setFieldValue: FormikHelpers<any>["setFieldValue"];
    errors: FormikErrors<CreateContactRequestPayload>;
    touched: FormikTouched<CreateContactRequestPayload>;
    placeholder?: string;
    initialIsCollapsed: boolean;
    isPrefilledAddContact: boolean;
    navigation: CompositeNavigationProp<any, any>;
};

export default function CollapsibleFormSection({
    values,
    handleChange,
    currencyType,
    setFieldValue,
    errors,
    touched,
    placeholder,
    initialIsCollapsed,
    isPrefilledAddContact,
    navigation,
}: AddWalletFieldArrayProps) {
    const currencyIcon = currencyType === CurrencyType.BITCOIN ? faBitcoin : faEthereum;
    const iconColor = currencyType === CurrencyType.BITCOIN ? "#F7931A" : "#3C3C3D";

    const wallets = currencyType === CurrencyType.BITCOIN ? values.btcWallets : values.ethWallets;
    const currencyErrors = currencyType === CurrencyType.BITCOIN ? errors.btcWallets : errors.ethWallets;
    const currencyTouched = currencyType === CurrencyType.BITCOIN ? touched.btcWallets : touched.ethWallets;
    const walletListString = currencyType === CurrencyType.BITCOIN ? "btcWallets" : "ethWallets";

    const addWalletButtonText = (walletsAmount: number) => {
        if (walletsAmount > 0) {
            return "Add another " + getCurrencyTypeUILabel(currencyType) + " wallet";
        } else {
            if (currencyType === CurrencyType.BITCOIN) {
                return "Add a Bitcoin wallet";
            } else {
                return "Add an Ethereum wallet";
            }
        }
    };

    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(initialIsCollapsed);

    return (
        <>
            <Pressable
                onPress={() => {
                    setIsCollapsed(!isCollapsed);
                }}
                testID={`walletCollapsibleButton${currencyType}`}
            >
                <HStack marginTop={"35px"} alignItems="center">
                    <FontAwesomeIcon color={iconColor} icon={currencyIcon} size={26} />
                    <Text fontWeight={"semibold"} size={"title3"} marginLeft={"10px"}>
                        {getCurrencyTypeUILabel(currencyType)} Wallets
                    </Text>
                    {isCollapsed ? (
                        <FontAwesomeIcon style={styles.chevronIcon} size={18} icon={farChevronDown} />
                    ) : (
                        <FontAwesomeIcon style={styles.chevronIcon} size={18} icon={farChevronUp} />
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
                                <View key={wallet}>
                                    <FormControl
                                        style={i > 1 ? { marginTop: 13 } : { marginTop: 15 }}
                                        isInvalid={!!(currencyErrors?.[i] && currencyTouched)}
                                    >
                                        <Input
                                            value={wallet}
                                            onChangeText={handleChange(`${walletListString}[${i}]`)}
                                            placeholder={placeholder}
                                            rightElement={
                                                !isPrefilledAddContact ? (
                                                    <>
                                                        <QRCodeScannerInputIcon
                                                            fieldKey={`${walletListString}[${i}]`}
                                                            setFieldValue={setFieldValue}
                                                            currencyType={currencyType}
                                                            navigation={navigation}
                                                        />
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
                                                    </>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                            isDisabled={isPrefilledAddContact}
                                            testID={`walletAddressInput${currencyType}`}
                                        />
                                        <FormControl.ErrorMessage>
                                            {currencyErrors ? currencyErrors[i] : ""}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                </View>
                            ))}
                            {!isPrefilledAddContact && (
                                <View>
                                    <Pressable
                                        onPress={() => {
                                            arrayHelpers.push("");
                                        }}
                                        testID={`addAnother${currencyType}`}
                                    >
                                        <HStack style={{ marginTop: 15 }} space={"10px"} alignItems={"center"}>
                                            <FontAwesomeIcon color={"#0077E6"} icon={farCirclePlus} size={18} />
                                            <Text color={"darkBlue.500"} fontWeight={"semibold"} size={"callout"}>
                                                {addWalletButtonText(wallets.length)}
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

const styles = StyleSheet.create({
    chevronIcon: {
        marginLeft: "auto",
        marginRight: 5,
        color: "#A3A3A3",
    },
});
