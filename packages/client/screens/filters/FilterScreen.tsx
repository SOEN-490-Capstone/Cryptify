import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { Text, Box, Button, HStack, Link, Pressable, ScrollView, Badge, VStack } from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import { getFiltersByDateStrings, getFiltersByTransactionStrings } from "../../services/filter_service";
import { farBookmark } from "../../components/icons/regular/farBookmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SaveFilterActionSheet from "../../components/SaveFilterActionSheet";
import { fasBookmark } from "../../components/icons/solid/fasBookmark";
import { farChevronRight } from "../../components/icons/regular/farChevronRight";
import { useIsFocused } from "@react-navigation/native";
import SortService from "../../services/sort_service";

export default function FilterScreen({ route, navigation }: HomeStackScreenProps<"FilterScreen">) {
    const isFocused = useIsFocused();

    const filtersByTransaction = getFiltersByTransactionStrings(route.params.wallet.currencyType);

    const filtersByDate = getFiltersByDateStrings();

    const [filterByTransaction, setFilterByTransaction] = React.useState(
        route.params.filters[0] || filtersByTransaction[0],
    );
    const [filterByDate, setFilterByDate] = React.useState(route.params.filters[1] || filtersByDate[0]);

    const [filterByContact, setFilterByContact] = React.useState<string[]>([...route.params.contactFilters]);
    const [filterByTag, setFilterByTag] = React.useState<string[]>([...route.params.tagFilters]);

    const areFiltersDefault = () =>
        filterByTransaction === filtersByTransaction[0] &&
        filterByDate === filtersByDate[0] &&
        filterByContact.length === 0 &&
        filterByTag.length === 0;

    const [isFilterSaved, setIsFilterSaved] = React.useState(route.params.isUsingSavedFilter);

    function ResetLink() {
        return (
            <Link
                isUnderlined={false}
                _text={{
                    color: "darkBlue.500",
                    fontWeight: "semibold",
                }}
                onPress={() => {
                    setFilterByTransaction(filtersByTransaction[0]);
                    setFilterByDate(filtersByDate[0]);
                    setFilterByContact([]);
                    setFilterByTag([]);
                    setIsFilterSaved(false);
                }}
            >
                Reset
            </Link>
        );
    }

    React.useEffect(() => {
        if (filterByDate === "Custom Dates") {
            setFilterByDate(filtersByDate[0]);
        }
    }, [filterByDate, isFocused]);

    React.useEffect(() => {
        (() => {
            navigation.setOptions({
                headerRight: () => (
                    <HStack space={"15px"}>
                        {!areFiltersDefault() && <ResetLink />}
                        <Pressable
                            onPress={() =>
                                navigation.navigate("SavedFiltersScreen", {
                                    currencyType: route.params.wallet.currencyType,
                                    setFilterByTransaction,
                                    setFilterByDate,
                                    setFilterByContact,
                                    setFilterByTag,
                                    setIsFilterSaved,
                                })
                            }
                        >
                            {isFilterSaved ? (
                                <FontAwesomeIcon icon={fasBookmark} size={22} color={"#0077E6"} />
                            ) : (
                                <FontAwesomeIcon icon={farBookmark} size={22} />
                            )}
                        </Pressable>
                    </HStack>
                ),
            });
        })();
    }, [filterByTransaction, filterByDate, isFilterSaved, filterByContact, filterByTag]);

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                <VStack marginTop={"20px"} space={"10px"}>
                    <Text>Transaction</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <HStack>
                            {filtersByTransaction.map((option) => (
                                <Pressable
                                    key={option}
                                    onPress={() => {
                                        setFilterByTransaction(option);
                                        setIsFilterSaved(false);
                                    }}
                                >
                                    <Badge
                                        borderRadius={"8px"}
                                        backgroundColor="gray.100"
                                        px={"10px"}
                                        py={"5px"}
                                        key={option}
                                        style={[
                                            styles.badge,
                                            filterByTransaction === option
                                                ? { borderColor: "#404040", borderWidth: 1 }
                                                : {},
                                        ]}
                                    >
                                        <Text
                                            size={"subheadline"}
                                            fontWeight={filterByTransaction === option ? "semibold" : "regular"}
                                        >
                                            {option}
                                        </Text>
                                    </Badge>
                                </Pressable>
                            ))}
                        </HStack>
                    </ScrollView>
                </VStack>
                <Pressable
                    marginTop="15px"
                    onPress={() =>
                        navigation.navigate("FilterDateScreen", {
                            filters: route.params.filters,
                            setFilters: route.params.setFilters,
                            filterByDate,
                            setFilterByDate,
                            setIsFilterSaved,
                        })
                    }
                >
                    <HStack height="44px" alignItems="center">
                        <Text color={"text.700"} marginRight="15">
                            Date
                        </Text>
                        <Box flex={1}></Box>
                        <Text color={"text.500"} marginRight={"10px"}>
                            {filterByDate === filtersByDate[0] || filterByDate === "Custom Dates" ? "" : filterByDate}
                        </Text>
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                </Pressable>
                <Pressable
                    marginTop="15px"
                    onPress={() =>
                        navigation.navigate("FilterContactScreen", {
                            filters: route.params.filters,
                            setFilters: route.params.setFilters,
                            filterByContact,
                            setFilterByContact,
                            setIsFilterSaved,
                        })
                    }
                >
                    <HStack height="44px" alignItems="center">
                        <Text color={"text.700"} marginRight="15">
                            Contacts
                        </Text>
                        <Box flex={1}>
                            <Text color={"text.500"} marginRight={"10px"} isTruncated style={{ marginLeft: "auto" }}>
                                {filterByContact.join(", ")}
                            </Text>
                        </Box>
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                </Pressable>
                <Pressable
                    marginTop="15px"
                    onPress={() =>
                        navigation.navigate("FilterTagScreen", {
                            filters: route.params.filters,
                            setFilters: route.params.setFilters,
                            filterByTag,
                            setFilterByTag,
                            setIsFilterSaved,
                        })
                    }
                >
                    {filterByTag.length === 0 ? (
                        <HStack height={"44px"} marginBottom={"13px"} alignItems="center">
                            <Text>Tags</Text>
                            <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                        </HStack>
                    ) : (
                        <HStack>
                            <VStack space={"10px"} style={{ width: "100%", overflow: "hidden" }}>
                                <Text>Tags</Text>
                                <HStack flexWrap={"wrap"}>
                                    {SortService.sortAlphabetically(filterByTag).map((tag) => (
                                        <Badge
                                            borderRadius={"8px"}
                                            backgroundColor="gray.100"
                                            px={"10px"}
                                            py={"5px"}
                                            key={tag}
                                            style={styles.badge}
                                            marginBottom={"13px"}
                                        >
                                            <Text size={"subheadline"} fontWeight={"semibold"} isTruncated>
                                                {tag}
                                            </Text>
                                        </Badge>
                                    ))}
                                </HStack>
                            </VStack>
                            <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                        </HStack>
                    )}
                </Pressable>
                <Box marginTop="12px" />
                {/* If areFiltersDefault and isFilterSaved is false then display SaveFilterActionSheet*/}
                {!areFiltersDefault() && !isFilterSaved && (
                    <SaveFilterActionSheet
                        setIsFilterSaved={setIsFilterSaved}
                        setFilters={route.params.setFilters}
                        filterByTransaction={filterByTransaction}
                        filterByDate={filterByDate}
                        filterByContact={filterByContact}
                        filterByTag={filterByTag}
                        currencyType={route.params.wallet.currencyType}
                    />
                )}
            </ScrollView>
            <Box style={styles.applyFiltersButtonContainer}>
                <Button
                    isDisabled={
                        filterByTransaction === route.params.filters[0] &&
                        filterByDate === route.params.filters[1] &&
                        JSON.stringify(filterByContact) === JSON.stringify(route.params.contactFilters) &&
                        JSON.stringify(filterByTag) === JSON.stringify(route.params.tagFilters)
                    }
                    onPress={() => {
                        const filters = [filterByTransaction];

                        // If a custom date is selected, but at least one of the from or to dates are not selected,
                        // then filterByDate value will be "Custom Dates" and not the date range. In this scenario,
                        // use the default date filter value.
                        if (filterByDate === "Custom Dates") {
                            filters.push(filtersByDate[0]);
                        } else {
                            filters.push(filterByDate);
                        }

                        route.params.setFilters(filters);
                        route.params.setContactFilters(filterByContact);
                        route.params.setTagFilters(filterByTag);
                        route.params.setIsUsingSavedFilter(isFilterSaved);
                        navigation.goBack();
                    }}
                    testID="applyFiltersSubmit"
                >
                    Apply filters
                </Button>
            </Box>
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
    RadioItem: {
        marginTop: 20,
    },
    chevronRightIcon: {
        color: "#A3A3A3",
        marginLeft: "auto",
    },
    badge: {
        marginRight: 10,
        justifyContent: "center",
    },
    applyFiltersButtonContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 8,
        backgroundColor: "white",
    },
});
