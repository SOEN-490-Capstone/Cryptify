import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Text, Radio, Box, Button, HStack, Link, Pressable } from "native-base";
import { HomeStackScreenProps } from "../types";
import React from "react";
import DateBox from "../components/DateBox";
import { getFiltersByDateStrings, getFiltersByTransactionStrings } from "../services/filter_service";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farChevronRight } from "../components/icons/regular/farChevronRight";
import { useIsFocused } from "@react-navigation/native";

export default function FilterScreen({ route, navigation }: HomeStackScreenProps<"FilterScreen">) {
    const filtersByTransaction = getFiltersByTransactionStrings(route.params.wallet.currencyType);

    const isFocused = useIsFocused();

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

    const areFiltersDefault =
        filterByTransaction === filtersByTransaction[0] &&
        filterByDate === filtersByDate[0] &&
        filterByContact.length === 0;

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
                    route.params.setContactFilters([]);
                    navigation.goBack();
                }}
            >
                Reset
            </Link>
        );
    }

    React.useEffect(() => {
        (() => {
            navigation.setOptions({
                headerRight: () => !areFiltersDefault && <ResetLink />,
            });
        })();
    }, [filterByTransaction, filterByDate, route.params.contactFilters]);

    React.useEffect(() => {
        setFilterByContact(route.params.contactFilters);
    }, [route.params.contactFilters, isFocused]);

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
            {filterByDate === filtersByDate[filtersByDate.length - 1] && <CustomDates />}
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
                    <Text fontWeight={"semibold"} color={"text.500"}>
                        Filter by Contact
                    </Text>
                    {filterByContact.map((contact) => (
                        <Text color={"text.500"}>{contact},</Text>
                    ))}
                    <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
                </HStack>
            </Pressable>
            <Box marginTop="20px" />
            <Button
                style={
                    filterByTransaction === route.params.filters[0] &&
                    filterByDate === route.params.filters[1] &&
                    filterByContact.length === 0
                        ? styles.applyButtonDisabled
                        : styles.applyButton
                }
                disabled={
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
