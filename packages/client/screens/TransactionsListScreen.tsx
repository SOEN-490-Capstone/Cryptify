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
import {
    filterTransactions,
    getFiltersByDateStrings,
    getFiltersByTransactionStrings,
} from "../services/filter_service";
import { falMagnifyingGlass } from "../components/icons/light/falMagnifyingGlass";

export default function TransactionsListScreen(props: HomeStackScreenProps<"TransactionsListScreen">) {
    const filtersByTransaction = getFiltersByTransactionStrings(props.route.params.wallet.currencyType);
    const filtersByDate = getFiltersByDateStrings();

    const [transactions, setTransactions] = React.useState<Transaction[]>([...props.route.params.transactions]);
    const [sortType, setSortType] = React.useState("sortDateNewest");
    const [filters, setFilters] = React.useState<string[]>([filtersByTransaction[0], filtersByDate[0]]);
    const [isUsingSavedFilter, setIsUsingSavedFilter] = React.useState(false);
    const [contactFilters, setContactFilters] = React.useState<string[]>([]);
    const [tagFilters, setTagFilters] = React.useState<string[]>([]);

    React.useEffect(() => {
        (() => {
            props.navigation.setOptions({
                headerRight: () => (
                    <HStack>
                        <SortActionSheet setSortType={setSortType} sortType={sortType} />
                        <Pressable
                            marginLeft={"15px"}
                            onPress={() => {
                                props.navigation.navigate("FilterScreen", {
                                    filters,
                                    setFilters,
                                    wallet: props.route.params.wallet,
                                    isUsingSavedFilter,
                                    setIsUsingSavedFilter,
                                    contactFilters: contactFilters,
                                    setContactFilters: setContactFilters,
                                    tagFilters: tagFilters,
                                    setTagFilters: setTagFilters,
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
        const DisplayedTransaction = filterTransactions(
            props.route.params.wallet.currencyType,
            props.route.params.wallet.address,
            [...props.route.params.transactions],
            filtersDisplayed,
            contactFilters,
            tagFilters,
        );

        setTransactions(
            SortService.sortTransactions(sortType, DisplayedTransaction, props.route.params.wallet.address),
        );
    }, [filters, contactFilters, tagFilters]);

    // To Do Move into components folder for later use.
    function FiltersBadges() {
        return (
            <ScrollView horizontal marginX={"10px"}>
                <HStack style={sortType === "sortDateNewest" ? { display: "none" } : styles.badge}>
                    <Text size={"footnote1"} fontWeight={"semibold"} color={"darkBlue.500"} style={styles.badgeText}>
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
                                // Get the index of the filter that was pressed in the filters array and replace it with "All transactions"
                                const index = filters.indexOf(filter);
                                const newFilters = [...filters];
                                newFilters[index] = "All transactions";
                                setFilters(newFilters);
                            }}
                        >
                            <FontAwesomeIcon style={{ color: "#0077E6" }} icon={facCircleXMark} size={14} />
                        </Pressable>
                    </HStack>
                ))}
                {/*Since contacts use a different filter array, we need to have render the badge separately*/}
                {contactFilters.map((filter) => (
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
                                setContactFilters(contactFilters.filter((f) => f !== filter));
                            }}
                        >
                            <FontAwesomeIcon style={{ color: "#0077E6" }} icon={facCircleXMark} size={14} />
                        </Pressable>
                    </HStack>
                ))}
                {tagFilters.map((filter) => (
                    <HStack key={filter} style={styles.badge}>
                        <Text
                            size={"footnote1"}
                            fontWeight={"semibold"}
                            color={"darkBlue.500"}
                            style={styles.badgeText}
                        >
                            {"Tag: " + filter}
                        </Text>

                        <Pressable
                            onPress={() => {
                                // This removes the current filter when the XMark is pressed.
                                setTagFilters(tagFilters.filter((f) => f !== filter));
                            }}
                        >
                            <FontAwesomeIcon style={{ color: "#0077E6" }} icon={facCircleXMark} size={14} />
                        </Pressable>
                    </HStack>
                ))}
            </ScrollView>
        );
    }

    return (
        <View style={styles.view}>
            <VStack>
                {(filtersDisplayed.length > 0 ||
                    sortType !== "sortDateNewest" ||
                    contactFilters.length > 0 ||
                    tagFilters.length > 0) && <FiltersBadges />}
                {transactions.length == 0 ? (
                    <VStack mt={"190px"} style={styles.magnifyingGlass}>
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
                                        contactFilters,
                                        setContactFilters,
                                        tagFilters: tagFilters,
                                        setTagFilters: setTagFilters,
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
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: 20,
    },
    badge: {
        backgroundColor: "#DBF4FF",
        borderRadius: 100,
        marginHorizontal: 5,
        marginBottom: 15,
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
