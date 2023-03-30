import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { Text, Radio, Box, Button, HStack, Link, Pressable, ScrollView } from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import { getFiltersByDateStrings, getFiltersByTransactionStrings } from "../../services/filter_service";
import { farBookmark } from "../../components/icons/regular/farBookmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SaveFilterActionSheet from "../../components/SaveFilterActionSheet";
import { fasBookmark } from "../../components/icons/solid/fasBookmark";
import { farChevronRight } from "../../components/icons/regular/farChevronRight";
import { useIsFocused } from "@react-navigation/native";

export default function FilterScreen({ route, navigation }: HomeStackScreenProps<"FilterScreen">) {
    const isFocused = useIsFocused();

    const filtersByTransaction = getFiltersByTransactionStrings(route.params.wallet.currencyType);

    const filtersByDate = getFiltersByDateStrings();

    const [filterByTransaction, setFilterByTransaction] = React.useState(
        route.params.filters[0] || filtersByTransaction[0],
    );
    const [filterByDate, setFilterByDate] = React.useState(route.params.filters[1] || filtersByDate[0]);

    const [filterByContact, setFilterByContact] = React.useState<string[]>([...route.params.contactFilters]);
    const [filterByTag, setFilterByTag] = React.useState<string[]>([]);

    type RadioProps = {
        value: string;
        setValue: React.Dispatch<React.SetStateAction<string>>;
        options: string[];
    };

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
                    route.params.setIsUsingSavedFilter(false);
                    setFilterByContact([]);
                    setFilterByTag([]);
                    route.params.setTagFilters([]);
                    setIsFilterSaved(false);
                }}
            >
                Reset
            </Link>
        );
    }

    React.useEffect(() => {
        setFilterByTag(route.params.tagFilters);
    }, [route.params.tagFilters, isFocused]);

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
                                    setFilters: route.params.setFilters,
                                    setFilterByTransaction,
                                    setFilterByDate,
                                    setIsUsingSavedFilter: route.params.setIsUsingSavedFilter,
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

    function RadioGroup({ options, value, setValue }: RadioProps) {
        return (
            <Radio.Group
                name="myRadioGroup"
                value={value}
                onChange={(nextValue) => {
                    setValue(nextValue);
                }}
            >
                {options.map((option) => (
                    <Box style={styles.RadioItem} key={option}>
                        <Radio key={option} value={option} color={"darkBlue.500"}>
                            {option}
                        </Radio>
                    </Box>
                ))}
            </Radio.Group>
        );
    }

    function renderFilterByContact() {
        let contacts = "";

        // build a contact string with all the contacts separated by commas
        for (let i = 0; i < filterByContact.length; i++) {
            if (i === filterByContact.length - 1) {
                contacts += filterByContact[i];
            } else {
                contacts += filterByContact[i] + ", ";
            }
        }

        return contacts;
    }

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                <Box marginTop="20px" />
                <Text fontWeight={"semibold"} color={"text.500"}>
                    Filter by transaction
                </Text>
                <RadioGroup
                    options={filtersByTransaction}
                    value={filterByTransaction}
                    setValue={setFilterByTransaction}
                />
                <Pressable
                    marginTop="25px"
                    onPress={() =>
                        navigation.navigate("FilterDateScreen", {
                            filters: route.params.filters,
                            setFilters: route.params.setFilters,
                            filterByDate,
                            setFilterByDate,
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
                            setContactFilters: route.params.setContactFilters,
                        })
                    }
                >
                    <HStack height="44px" alignItems="center">
                        <Text color={"text.700"} marginRight="15">
                            Contacts
                        </Text>
                        <Box flex={1}>
                            <Text color={"text.500"} marginRight={"10px"} isTruncated style={{ marginLeft: "auto" }}>
                                {renderFilterByContact()}
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
                            tagFilters: route.params.tagFilters,
                            setTagFilters: route.params.setTagFilters,
                        })
                    }
                >
                    <HStack height="44px" alignItems="center">
                        <Text color={"text.700"} marginRight="15">
                            Tags
                        </Text>
                        <Box flex={1}></Box>
                        {filterByTag.map((tag) => (
                            <Pressable borderRadius={"8px"} backgroundColor="gray.100" style={styles.badge} key={tag}>
                                <HStack space={"10px"} alignItems={"center"}>
                                    <Text size={"subheadline"} fontWeight={"semibold"}>
                                        {tag}
                                    </Text>
                                </HStack>
                            </Pressable>
                        ))}
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                </Pressable>
                <Box marginTop="25px" />
                {!(
                    filterByTransaction === filtersByTransaction[0] &&
                    filterByDate === filtersByDate[0] &&
                    filterByContact.length === 0 &&
                    filterByTag.length === 0
                ) &&
                    (!isFilterSaved ||
                        !(
                            filterByTransaction === route.params.filters[0] &&
                            filterByDate === route.params.filters[1] &&
                            filterByContact.length === 0 &&
                            filterByTag.length === 0
                        )) && (
                        <SaveFilterActionSheet
                            setIsUsingSavedFilter={route.params.setIsUsingSavedFilter}
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
                        route.params.setIsUsingSavedFilter(false);
                        route.params.setContactFilters(filterByContact);
                        setIsFilterSaved(false);
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
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 13,
        marginBottom: 13,
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
