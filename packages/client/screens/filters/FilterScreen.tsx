import { View } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { Text, Radio, Box, Button, HStack, Link, Pressable } from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import DateBox from "../../components/DateBox";
import { getFiltersByDateStrings, getFiltersByTransactionStrings } from "../../services/filter_service";
import { farBookmark } from "../../components/icons/regular/farBookmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SaveFilterActionSheet from "../../components/SaveFilterActionSheet";
import { fasBookmark } from "../../components/icons/solid/fasBookmark";
import DateBox from "../components/DateBox";
import { getFiltersByDateStrings, getFiltersByTransactionStrings } from "../services/filter_service";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { farChevronRight } from "../components/icons/regular/farChevronRight";

export default function FilterScreen({ route, navigation }: HomeStackScreenProps<"FilterScreen">) {
    const filtersByTransaction = getFiltersByTransactionStrings(route.params.wallet.currencyType);

    const filtersByDate = getFiltersByDateStrings();

    const [filterByTransaction, setFilterByTransaction] = React.useState(
        route.params.filters[0] || filtersByTransaction[0],
    );
    const [filterByDate, setFilterByDate] = React.useState(route.params.filters[1] || filtersByDate[0]);

    type RadioProps = {
        value: string;
        setValue: React.Dispatch<React.SetStateAction<string>>;
        options: string[];
    };

    const areFiltersDefault = () =>
        filterByTransaction === filtersByTransaction[0] && filterByDate === filtersByDate[0];

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
                    setIsFilterSaved(false);
                }}
            >
                Reset
            </Link>
        );
    }

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
    }, [filterByTransaction, filterByDate, isFilterSaved]);

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
            <Text fontWeight={"semibold"} color={"text.500"}>
                Filter by transaction
            </Text>
            <RadioGroup options={filtersByTransaction} value={filterByTransaction} setValue={setFilterByTransaction} />
            <Text marginTop="30px" fontWeight={"semibold"} color={"text.500"}>
                Filter by date
            </Text>
            <RadioGroup options={filtersByDate} value={filterByDate} setValue={setFilterByDate} />

            <Pressable marginTop="30px"
                onPress={() => navigation.navigate("FilterContactScreen", {})}
                _pressed={{
                    background: "text.200",
                }}
            >
                        <HStack height="50px" alignItems="center">
                            <Text fontWeight={"semibold"} color={"text.500"}>
                                Filter by Contact
                            </Text>
                            <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                        </HStack>
                    </Pressable>
            <Box marginTop="20px" />
            {filterByDate === filtersByDate[filtersByDate.length - 1] && <CustomDates />}
            {!(filterByTransaction === filtersByTransaction[0] && filterByDate === filtersByDate[0]) &&
                (!isFilterSaved ||
                    !(filterByTransaction === route.params.filters[0] && filterByDate === route.params.filters[1])) && (
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
            <Button
                style={styles.applyButton}
                isDisabled={filterByTransaction === route.params.filters[0] && filterByDate === route.params.filters[1]}
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
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 20,
    },
    RadioItem: {
        marginTop: 20,
    },
    applyButton: {
        marginTop: "auto",
    },
    applyButtonDisabled: {
        marginTop: "auto",
        opacity: 0.6,
    },
    chevronRightIcon: {
        color: "#A3A3A3",
        marginLeft: "auto",
        marginRight: 5,
    },
});
