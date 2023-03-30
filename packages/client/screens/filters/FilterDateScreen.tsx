import { View } from "../../components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { Text, HStack, Box, Radio } from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import DateBox from "../../components/DateBox";
import { getFiltersByDateStrings } from "../../services/filter_service";

export default function FilterDateScreen({ route, navigation }: HomeStackScreenProps<"FilterDateScreen">) {
    const filtersByDate = getFiltersByDateStrings();

    const [filterByDate, setFilterByDate] = React.useState(getFilterByDate());

    // Get the from and to dates from the following Custom Dates format: Mon DD, YYYY - Mon DD, YYYY
    const [fromDate, setFromDate] = React.useState<Date | null>(getFromDate());
    const [toDate, setToDate] = React.useState<Date | null>(getToDate());

    function getFilterByDate() {
        if (route.params.filterByDate) {
            if (filtersByDate.includes(route.params.filterByDate)) {
                return route.params.filterByDate;
            } else {
                return filtersByDate[filtersByDate.length - 1];
            }
        } else {
            return filtersByDate[0];
        }
    }

    function getFromDate(): Date | null {
        if (route.params.filters[1]) {
            // Filter is a custom date
            if (!filtersByDate.includes(route.params.filterByDate)) {
                return new Date(route.params.filterByDate.split(" - ")[0]);
            }
        }

        return null;
    }

    function getToDate(): Date | null {
        if (route.params.filters[1]) {
            // Filter is a custom date
            if (!filtersByDate.includes(route.params.filterByDate)) {
                return new Date(route.params.filterByDate.split(" - ")[1]);
            }
        }

        return null;
    }

    React.useEffect(() => {
        (() => {
            navigation.setOptions({
                headerRight: () =>
                    filterByDate !== filtersByDate[0] && (
                        <Pressable
                            onPress={() => {
                                route.params.filters[1] = filtersByDate[0];
                                setToDate(null);
                                setFromDate(null);
                                setFilterByDate(filtersByDate[0]);
                                route.params.setFilterByDate(filtersByDate[0]);
                            }}
                        >
                            <Text color={"#007AFF"} fontWeight={"semibold"}>
                                Reset
                            </Text>
                        </Pressable>
                    ),
            });
        })();
    });

    function getFormattedDate(timestamp: string): string {
        const date = new Date(timestamp);
        const datePart = date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });
        return `${datePart}`;
    }

    React.useEffect(() => {
        if (fromDate && toDate) {
            const customDate = `${getFormattedDate(fromDate.toString())} - ${getFormattedDate(toDate.toString())}`;
            route.params.filters[1] = customDate;
            route.params.setFilters(route.params.filters);
            route.params.setFilterByDate(customDate);
        }
    }, [toDate, fromDate]);

    function handleRadioChange(nextValue: string) {
        setFilterByDate(nextValue);
        route.params.setFilterByDate(nextValue);
        route.params.filters[1] = nextValue;
        route.params.setFilters(route.params.filters);
    }

    type RadioProps = {
        value: string;
        options: string[];
    };

    function RadioGroup({ options, value }: RadioProps) {
        return (
            <Radio.Group
                name="myRadioGroup"
                value={value}
                onChange={(nextValue) => {
                    handleRadioChange(nextValue);
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
            <RadioGroup options={filtersByDate} value={filterByDate} />
            {filterByDate === filtersByDate[filtersByDate.length - 1] && (
                <>
                    <Box marginTop="20px" />
                    <CustomDates />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
    },
    RadioItem: {
        marginTop: 20,
    },
});
