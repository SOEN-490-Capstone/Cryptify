import React from "react";
import {StyleSheet} from "react-native";
import {Pressable, Text} from "native-base";
import {View} from "../../components/Themed";
import {SettingsStackScreenProps} from "../../types";
import {getCurrencyType} from "@cryptify/common/src/utils/currency_utils";
import {CurrencyType, currencyTypes} from "@cryptify/common/src/domain/currency_type";
import CollapsibleAddressSection from "../../components/contacts/CollapsibleAddressSection";

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
    
    return (
        <View style={styles.view}>
            {currencyTypes.map((type) => {
                const addrs = contact.addresses
                    .map((contactAddr) => contactAddr.walletAddress)
                    .filter((addr) => getCurrencyType(addr) === type);
                
                return addrs.length > 0 && <CollapsibleAddressSection addresses={addrs} type={type} key={type} />
            })}
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
