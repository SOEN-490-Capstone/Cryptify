import React from "react";
import { StyleSheet } from "react-native";
import { Center, Pressable, ScrollView, Text, VStack } from "native-base";
import { View } from "../../components/Themed";
import { SettingsStackScreenProps } from "../../types";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import { currencyTypes } from "@cryptify/common/src/domain/currency_type";
import CollapsibleAddressSection from "../../components/contacts/CollapsibleAddressSection";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { falUser } from "../../components/icons/light/falUser";
import { falWallet } from "../../components/icons/light/falWallet";

export default function ContactOverviewScreen({
    route,
    navigation,
}: SettingsStackScreenProps<"ContactOverviewScreen">) {
    const [contact, setContact] = React.useState(route.params.contact);

    React.useEffect(() => {
        (() => {
            navigation.setOptions({
                headerRight: () => (
                    <Pressable
                        onPress={() =>
                            navigation.navigate("EditContactScreen", {
                                contact,
                                setContact,
                            })
                        }
                        testID="editContactButton"
                    >
                        <Text>Edit</Text>
                    </Pressable>
                ),
            });
        })();
    });

    const addressList =
        contact.addresses.length > 0 ? (
            currencyTypes.map((type) => {
                const addrs = contact.addresses
                    .map((contactAddr) => contactAddr.walletAddress)
                    .filter((addr) => getCurrencyType(addr) === type);

                return addrs.length > 0 && <CollapsibleAddressSection addresses={addrs} type={type} key={type} />;
            })
        ) : (
            <Center alignItems="center" marginTop="135px">
                <FontAwesomeIcon icon={falWallet} style={styles.walletIcon} size={56} />
                <Text marginTop={"15px"}>This contact does not have any wallets.</Text>
            </Center>
        );

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                <VStack space={"35px"} paddingTop={"20px"} paddingBottom={"10px"}>
                    <Center>
                        <FontAwesomeIcon icon={falUser} size={48} style={styles.userIcon} />
                        <Text marginTop={"15px"} size={"title2"} fontWeight={"semibold"} textTransform={"capitalize"}>
                            {contact.contactName}
                        </Text>
                    </Center>
                    {addressList}
                </VStack>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: 15,
    },
    userIcon: {
        color: "#404040",
    },
    walletIcon: {
        color: "#404040",
    },
});
