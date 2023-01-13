import React from "react";
import { SettingsStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { Formik } from "formik";
import { FormControl, HStack, Input, Text } from "native-base";
import Collapsible from "react-native-collapsible";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBitcoin } from "../components/icons/brands/faBitcoin";
import { farChevronUp } from "../components/icons/regular/farChevronUp";
import { farChevronDown } from "../components/icons/regular/farChevronDown";
import { falCircleXMark } from "../components/icons/light/falCircleXMark";
import { fasCirclePlusSolid } from "../components/icons/solid/fasCirclePlusSolid";

export default function AddContactScreen(props: SettingsStackScreenProps<"ContactsSettingsScreen">) {
    const initialValues = {
        name: "",
        ethWallets: [],
        btcWallets: [],
    };

    type walletListItem = {
        walletAddress: string,
        listItemId: number,
    };

    const [btcWallets, setBtcWallets] = React.useState<walletListItem[]>([]);

    const [isBtcCollapsed, setIsBtcCollapsed] = React.useState<boolean>(true);

    function onAddContactSubmit() {}

    return (
        <>
            <View style={styles.view}>
                <Formik initialValues={initialValues} onSubmit={onAddContactSubmit}>
                    {({ values, errors, touched, handleChange, submitForm }) => (
                        <FormControl>
                            <Input
                                placeholder="Name"
                                maxLength={20}
                                keyboardType={"ascii-capable"}
                                testID="contactNameInput"
                            />
                            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
                            <></>
                            <Pressable
                                onPress={() => {
                                    setIsBtcCollapsed(!isBtcCollapsed);
                                }}
                            >
                                <HStack style={{ marginTop: 40 }}>
                                    <FontAwesomeIcon
                                        style={{ marginRight: 10 }}
                                        color={"#F7931A"}
                                        icon={faBitcoin}
                                        size={26}
                                    />
                                    <Text fontWeight={"semibold"} size={"title3"}>
                                        Bitcoin Wallets
                                    </Text>
                                    {isBtcCollapsed ? (
                                        <FontAwesomeIcon style={styles.chevronIcon} size={18} icon={farChevronUp} />
                                    ) : (
                                        <FontAwesomeIcon style={styles.chevronIcon} icon={farChevronDown} size={18} />
                                    )}
                                </HStack>
                            </Pressable>
                            <Collapsible collapsed={isBtcCollapsed}>
                                <View>
                                    {btcWallets.map((wallet) => (
                                        <View style={{marginTop: 20}}>
                                            <Input
                                                rightElement={
                                                    <Pressable onPress={()=>{}}>
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
                                    <Pressable onPress={() => {

                                        const lastWallet = btcWallets.at(btcWallets.length - 1);
                                        if(lastWallet){
                                            setBtcWallets([...btcWallets, {walletAddress: "", listItemId: lastWallet.listItemId++}])
                                        }else {
                                            setBtcWallets([...btcWallets, {walletAddress: "", listItemId: 0}]);
                                        }

                                    }}>
                                        <HStack style={{ marginTop: 14 }}>
                                            <FontAwesomeIcon color={"#0077E6"} icon={fasCirclePlusSolid} size={20} />
                                            <Text
                                                style={{ marginLeft: 10 }}
                                                color={"darkBlue.500"}
                                                fontWeight={"semibold"}
                                            >
                                                Add another Ethereum wallet
                                            </Text>
                                        </HStack>
                                    </Pressable>
                                </View>
                            </Collapsible>
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
