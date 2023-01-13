import React from "react";
import { SettingsStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { FieldArray, Formik } from "formik";
import { FormControl, HStack, Input, Text } from "native-base";
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

export default function AddContactScreen(props: SettingsStackScreenProps<"ContactsSettingsScreen">) {
    type IValue = {
        name: string;
        ethWallets: string[];
        btcWallets: string[];
    };

    const initialValues: IValue = {
        name: "",
        ethWallets: [],
        btcWallets: [],
    };

    type addWalletFieldArrayProps = {
        values: IValue;
        handleChange: any;
        currencyType: CurrencyType;
    };

    function AddWalletFieldArray({ values, handleChange, currencyType }: addWalletFieldArrayProps) {
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
                {/* @ts-expect-error */}
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

    function onAddContactSubmit() {}

    return (
        <>
            <View style={styles.view}>
                <Formik initialValues={initialValues} onSubmit={onAddContactSubmit}>
                    {({ values, errors, touched, handleChange, submitForm }) => (
                        <FormControl>
                            <Input
                                value={values.name}
                                onChangeText={handleChange("name")}
                                placeholder="Name"
                                maxLength={20}
                                keyboardType={"ascii-capable"}
                                testID="contactNameInput"
                            />
                            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
                            <AddWalletFieldArray
                                values={values}
                                handleChange={handleChange}
                                currencyType={CurrencyType.BITCOIN}
                            />
                            <AddWalletFieldArray
                                values={values}
                                handleChange={handleChange}
                                currencyType={CurrencyType.ETHEREUM}
                            />
                        </FormControl>
                    )}
                </Formik>
            </View>
        </>
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
});
