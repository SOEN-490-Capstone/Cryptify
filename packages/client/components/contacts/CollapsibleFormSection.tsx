import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { faBitcoin } from "../icons/brands/faBitcoin";
import { faEthereum } from "../icons/brands/faEthereum";
import React from "react";
import { StyleSheet } from "react-native";
import { FormControl, HStack, Input, Text, Pressable } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { farChevronDown } from "../icons/regular/farChevronDown";
import { farChevronUp } from "../icons/regular/farChevronUp";
import Collapsible from "react-native-collapsible";
import { FieldArray, FormikErrors, FormikTouched } from "formik";
import { View } from "../Themed";
import { falCircleXMark } from "../icons/light/falCircleXMark";
import { farCirclePlus } from "../icons/regular/farCirclePlus";

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
    errors: FormikErrors<CreateContactRequestPayload>;
    touched: FormikTouched<CreateContactRequestPayload>;
    placeholder?: string;
    initialIsCollapsed: boolean;
    isPrefilledAddContact: boolean;
};

export default function CollapsibleFormSection({
    values,
    handleChange,
    currencyType,
    errors,
    touched,
    placeholder,
    initialIsCollapsed,
    isPrefilledAddContact,
}: AddWalletFieldArrayProps) {
    const currencyIcon = currencyType === CurrencyType.BITCOIN ? faBitcoin : faEthereum;
    const iconColor = currencyType === CurrencyType.BITCOIN ? "#F7931A" : "#3C3C3D";

    const wallets = currencyType === CurrencyType.BITCOIN ? values.btcWallets : values.ethWallets;
    const currencyErrors = currencyType === CurrencyType.BITCOIN ? errors.btcWallets : errors.ethWallets;
    const currencyTouched = currencyType === CurrencyType.BITCOIN ? touched.btcWallets : touched.ethWallets;
    const walletListString = currencyType === CurrencyType.BITCOIN ? "btcWallets" : "ethWallets";

    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(initialIsCollapsed);

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
                                <View style={wallets.length > 1 ? { marginTop: 13 } : { marginTop: 20 }} key={i}>
                                    <FormControl isInvalid={!!(currencyErrors?.[i] && currencyTouched)}>
                                        <Input
                                            value={wallet}
                                            onChangeText={handleChange(`${walletListString}[${i}]`)}
                                            placeholder={placeholder}
                                            rightElement={
                                                !isPrefilledAddContact ? (
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
                                            isDisabled={isPrefilledAddContact}
                                            testID="walletAddressInput"
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
                                        <HStack style={{ marginTop: 13 }} alignItems={"center"}>
                                            <FontAwesomeIcon color={"#0077E6"} icon={farCirclePlus} size={18} />
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

const styles = StyleSheet.create({
    chevronIcon: {
        marginLeft: "auto",
        marginRight: 5,
    },
});
