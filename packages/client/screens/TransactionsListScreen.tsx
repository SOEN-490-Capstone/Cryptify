import React from "react";
import { StyleSheet } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { TransactionsList } from "../components/transactions-list/TransactionsList";
import { Pressable, Text, HStack, ScrollView } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farBarsFilter } from "../components/icons/regular/farBarsFilter";
import { facCircleXMark } from "../components/icons/solid/fasCircleXMark";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import { filterTransction } from "../services/filter_service";

export default function TransactionsListScreen(
    props: CompositeScreenProps<
        HomeStackScreenProps<"TransactionsListScreen">,
        SettingsStackScreenProps<"TransactionsListScreen">
    >,
) {
    const [filters, setFilters] = React.useState<string[]>([]);

    React.useEffect(() => {
        (() => {
            props.navigation.setOptions({
                headerRight: () => (
                    <Pressable
                        onPress={() => {
                            props.navigation.navigate("FilterScreen", {
                                setFilters,
                                walletAddress: props.route.params.walletAddress,
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={farBarsFilter} size={20} />
                    </Pressable>
                ),
            });
        })();
    }, []);

    const filtersDisplayed = filters.filter((f) => f !== "All transactions");

    const transactions = props.route.params.transactions;
    const walletAddress = props.route.params.walletAddress;
    const type = getCurrencyType(walletAddress);

    const DisplayedTransaction = filterTransction(type, walletAddress, transactions, filtersDisplayed);

    function FiltersBadges() {
        return (
            <View style={{ height: 50 }}>
                <ScrollView horizontal>
                    {filtersDisplayed.map((filter) => (
                        <HStack key={filter} style={styles.badge}>
                            <Text style={styles.badgeText}>{filter}</Text>
                            <Pressable
                                onPress={() => {
                                    setFilters(filtersDisplayed.filter((f) => f !== filter));
                                }}
                            >
                                <FontAwesomeIcon style={{ color: "#0077E6" }} icon={facCircleXMark} size={14} />
                            </Pressable>
                        </HStack>
                    ))}
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.view}>
            {filtersDisplayed.length > 0 ? <FiltersBadges /> : null}
            <TransactionsList
                transactions={DisplayedTransaction}
                walletAddress={props.route.params.walletAddress}
                displaySeparation={true}
                navigation={props.navigation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    badge: {
        backgroundColor: "#DBF4FF",
        borderRadius: 100,
        marginRight: 10,
        paddingVertical: 8,
        paddingLeft: 15,
        paddingRight: 10.5,
        height: 35,
        alignItems: "center",
    },
    badgeText: {
        paddingRight: 10,
        color: "#0077E6",
    },
});
