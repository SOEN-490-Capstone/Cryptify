import React from "react";
import { StyleSheet } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { TransactionsList } from "../components/transactions-list/TransactionsList";
import { Pressable, Text, HStack, ScrollView, VStack, Center, Link } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farBarsFilter } from "../components/icons/regular/farBarsFilter";
import { facCircleXMark } from "../components/icons/solid/fasCircleXMark";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import { filterTransction } from "../services/filter_service";
import { falMagnifyingGlass } from "../components/icons/light/falMagnifyingGlass";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

export default function TransactionsListScreen(
    props: CompositeScreenProps<
        HomeStackScreenProps<"TransactionsListScreen">,
        SettingsStackScreenProps<"TransactionsListScreen">
    >,
) {
    const [filters, setFilters] = React.useState<string[]>([]);
    const [transactions, setTransactions] = React.useState<Transaction[]>([...props.route.params.transactions]);

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
    const walletAddress = props.route.params.walletAddress;
    const type = getCurrencyType(walletAddress);

    React.useEffect(() => {
        const DisplayedTransaction = filterTransction(
            type,
            walletAddress,
            [...props.route.params.transactions],
            filtersDisplayed,
        );
        setTransactions(DisplayedTransaction);
    }, [filters]);

    // To Do Move into components folder for later use.
    function FiltersBadges() {
        return (
            <View style={{ height: 35 }}>
                <ScrollView horizontal>
                    {filtersDisplayed.map((filter) => (
                        <HStack key={filter} style={styles.badge}>
                            <Text
                                size={"footnote1"}
                                fontWeight={"semibold"}
                                color={"darkBlue.500"}
                                style={styles.badgeText}
                            >
                                {filter}
                            </Text>
                            <Pressable
                                onPress={() => {
                                    // This removes the current filter when the XMark is pressed.
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
            {filtersDisplayed.length > 0 && <FiltersBadges />}
            {transactions.length == 0 ? (
                <VStack style={styles.magnifyingGlass} margin="auto">
                    <FontAwesomeIcon icon={falMagnifyingGlass} size={48} />
                    <Text style={styles.magnifyingGlassText}>
                        We could not find any transactions matching your filters.
                    </Text>
                    <Center marginTop="15">
                        <Link
                            _text={{
                                color: "darkBlue.500",
                                fontWeight: "semibold",
                            }}
                            isUnderlined={false}
                            onPress={() => {
                                props.navigation.navigate("FilterScreen", {
                                    setFilters,
                                    walletAddress: props.route.params.walletAddress,
                                });
                            }}
                        >
                            Choose another filter
                        </Link>
                    </Center>
                </VStack>
            ) : (
                <TransactionsList
                    transactions={transactions}
                    walletAddress={props.route.params.walletAddress}
                    displaySeparation={true}
                    navigation={props.navigation}
                />
            )}
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
        marginRight: 15,
        paddingVertical: 8,
        paddingHorizontal: 15,
        height: 35,
        alignItems: "center",
    },
    badgeText: {
        paddingRight: 10,
    },
    magnifyingGlass: {
        alignItems: "center",
    },
    magnifyingGlassText: {
        textAlign: "center",
        maxWidth: 265,
        marginTop: 15,
    },
});
