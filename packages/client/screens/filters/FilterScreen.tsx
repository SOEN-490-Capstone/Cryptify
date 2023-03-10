import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import {Text, Radio, Box, Button, HStack, Link, Pressable, ScrollView} from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import DateBox from "../../components/DateBox";
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

    const [filterByContact, setFilterByContact] = React.useState<string[]>([]);

    type RadioProps = {
        value: string;
        setValue: React.Dispatch<React.SetStateAction<string>>;
        options: string[];
    };

    const areFiltersDefault = () =>
        filterByTransaction === filtersByTransaction[0] &&
        filterByDate === filtersByDate[0] &&
        filterByContact.length === 0;

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
                    route.params.setFilters([filtersByTransaction[0], filtersByDate[0]]);
                    route.params.setIsUsingSavedFilter(false);
                    route.params.setContactFilters([]);
                    setFilterByContact([]);
                    setIsFilterSaved(false);
                }}
            >
                Reset
            </Link>
        );
    }

    React.useEffect(() => {
        setFilterByContact(route.params.contactFilters);
    }, [route.params.contactFilters, isFocused]);

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
    }, [filterByTransaction, filterByDate, isFilterSaved, filterByContact]);

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

    const [fromDate, setFromDate] = React.useState<Date | null>(null);
    const [toDate, setToDate] = React.useState<Date | null>(null);

    function CustomDates() {
        return (
            <HStack>
                <DateBox
                    label="from"
                    style={{ marginRight: 13 }}
                    date={fromDate}
                    maximumDate={toDate}
                    setDate={setFromDate}
                />
                <DateBox label="to" date={toDate} minimumDate={fromDate} setDate={setToDate} />
            </HStack>
        );
    }

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scrollView}>
                <Box marginTop="20px" />
                <Text fontWeight={"semibold"} color={"text.500"}>
                    Filter by transaction
                </Text>
                <RadioGroup options={filtersByTransaction} value={filterByTransaction} setValue={setFilterByTransaction} />
                <Text marginTop="30px" fontWeight={"semibold"} color={"text.500"}>
                    Filter by date
                </Text>
                <RadioGroup options={filtersByDate} value={filterByDate} setValue={setFilterByDate} />
                {filterByDate === filtersByDate[filtersByDate.length - 1] && (
                    <>
                        <Box marginTop="20px" />
                        <CustomDates />
                    </>
                )}
                <Pressable
                    marginTop="30px"
                    onPress={() =>
                        navigation.navigate("FilterContactScreen", {
                            filters: route.params.filters,
                            setFilters: route.params.setFilters,
                            contactFilters: route.params.contactFilters,
                            setContactFilters: route.params.setContactFilters,
                        })
                    }
                    _pressed={{
                        background: "text.200",
                    }}
                >
                    <HStack height="50px" alignItems="center">
                        <Text fontWeight={"semibold"} color={"text.500"} marginRight="15">
                            Contacts
                        </Text>
                        {filterByContact.map((contact) => (
                            <Text color={"text.500"} marginRight="1" key={contact}>
                                {contact},
                            </Text>
                        ))}
                        <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                    </HStack>
                </Pressable>
                <Box marginTop="25px" />
                {!(
                        filterByTransaction === filtersByTransaction[0] &&
                        filterByDate === filtersByDate[0] &&
                        filterByContact.length === 0
                    ) &&
                    (!isFilterSaved ||
                        !(
                            filterByTransaction === route.params.filters[0] &&
                            filterByDate === route.params.filters[1] &&
                            filterByContact.length === 0
                        )) && (
                        <SaveFilterActionSheet
                            setIsUsingSavedFilter={route.params.setIsUsingSavedFilter}
                            setIsFilterSaved={setIsFilterSaved}
                            setFilters={route.params.setFilters}
                            filterByTransaction={filterByTransaction}
                            filterByDate={filterByDate}
                            fromDate={fromDate}
                            toDate={toDate}
                            currencyType={route.params.wallet.currencyType}
                        />
                    )}
                <Box marginTop="25px" />
                <Button
                    style={styles.applyButton}
                    isDisabled={
                        filterByTransaction === route.params.filters[0] &&
                        filterByDate === route.params.filters[1] &&
                        filterByContact.length === 0
                    }
                    onPress={() => {
                        const filters = [filterByTransaction];

                        // this checks if the filter selected for the date is "custom date"
                        // since we need to have special logic that would add the two dates selected
                        if (filterByDate === "Custom Dates" && fromDate && toDate) {
                            const dateFormate = new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                            });

                            filters.push(`${dateFormate.format(fromDate)} - ${dateFormate.format(toDate)}`);
                        } else {
                            if (filterByDate !== "Custom Dates") {
                                filters.push(filterByDate);
                            }
                        }
                        route.params.setFilters(filters);
                        route.params.setIsUsingSavedFilter(false);
                        setIsFilterSaved(false);
                        navigation.goBack();
                    }}
                    testID="applyFiltersSubmit"
                >
                    Apply filters
                </Button>
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
    RadioItem: {
        marginTop: 20,
    },
    applyButton: {
        marginTop: "auto",
        marginBottom: 15,
    },
    chevronRightIcon: {
        color: "#A3A3A3",
        marginLeft: "auto",
        marginRight: 5,
    },
});
