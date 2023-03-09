import React from "react";
import { StyleSheet } from "react-native";
import { HomeStackScreenProps } from "../types";
import { View } from "../components/Themed";
import { TransactionsList } from "../components/transactions-list/TransactionsList";
import SortActionSheet from "../components/transactions-list/SortTransactionListComponent";
import SortService from "../services/sort_service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { Pressable, Text, HStack, ScrollView, VStack, Center, Link } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farBarsFilter } from "../components/icons/regular/farBarsFilter";
import { facCircleXMark } from "../components/icons/solid/fasCircleXMark";
import { filterTransctions } from "../services/filter_service";
import { falMagnifyingGlass } from "../components/icons/light/falMagnifyingGlass";

export default function TransactionsListScreen(props: HomeStackScreenProps<"TransactionsListScreen">) {
    const [transactions, setTransactions] = React.useState<Transaction[]>([...props.route.params.transactions]);
    const [sortType, setSortType] = React.useState("sortDateNewest");
    const [filters, setFilters] = React.useState<string[]>([]);
    const [isUsingSavedFilter, setIsUsingSavedFilter] = React.useState(false);
    const [isUsingSavedFilter, setIsUsingSavedFilter] = React.useState(false);

    React.useEffect(() => {
        (() => {
            props.navigation.setOptions({
                headerRight: () => (
                    <HStack>
                        <SortActionSheet setSortType={setSortType} sortType={sortType} />
                        <Pressable
                            onPress={() => {
                                props.navigation.navigate("FilterScreen", {
                                    filters,
                                    setFilters,
                                    wallet: props.route.params.wallet,
                                    isUsingSavedFilter,
                                    setIsUsingSavedFilter,
                                });
                            }}
                            testID="filterTransactionsButton"
                        >
                            <FontAwesomeIcon icon={farBarsFilter} size={20} />
                        </Pressable>
                    </HStack>
                ),
            });
        })();
    });

    const [displaySeparation, setDisplaySeparation] = React.useState(true);

    // Updates transaction list everytime a new sorting option is selected
    React.useEffect(() => {
        setTransactions(SortService.sortTransactions(sortType, transactions, props.route.params.wallet.address));
        setDisplaySeparation(sortType === "sortDateNewest" || sortType === "sortDateOldest");
        FiltersBadges();
    }, [sortType]);

    const filtersDisplayed = filters.filter((f) => f !== "All transactions");

    React.useEffect(() => {
        const DisplayedTransaction = filterTransctions(
            props.route.params.wallet.currencyType,
            props.route.params.wallet.address,
            [...props.route.params.transactions],
            filtersDisplayed,
        );

        setTransactions(
            SortService.sortTransactions(sortType, DisplayedTransaction, props.route.params.wallet.address),
        );
    }, [filters]);

    // To Do Move into components folder for later use.
    function FiltersBadges() {
        return (
            <View style={{ height: 35 }}>
                <ScrollView horizontal>
                    <HStack style={sortType === "sortDateNewest" ? { display: "none" } : styles.badge}>
                        <Text
                            size={"footnote1"}
                            fontWeight={"semibold"}
                            color={"darkBlue.500"}
                            style={styles.badgeText}
                        >
                            {SortService.sortBadgeValues(sortType)}
                        </Text>

                        <Pressable
                            onPress={() => {
                                setSortType("sortDateNewest");
                            }}
                        >
                            <FontAwesomeIcon style={{ color: "#0077E6" }} icon={facCircleXMark} size={14} />
                        </Pressable>
                    </HStack>

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
            {(filtersDisplayed.length > 0 || sortType !== "sortDateNewest") && <FiltersBadges />}
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
                                    filters,
                                    setFilters,
                                    wallet: props.route.params.wallet,
                                    isUsingSavedFilter,
                                    setIsUsingSavedFilter,
                                });
                            }}
                        >
                            Choose another filter
                        </Link>
                    </Center>
                </VStack>
            ) : (
                <>
                    <TransactionsList
                        transactions={transactions}
                        wallet={props.route.params.wallet}
                        displaySeparation={displaySeparation}
                        navigation={props.navigation}
                    />
                </>
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
