import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Text, Radio, Box, Button, HStack, Link } from "native-base";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import React from "react";
import { CompositeScreenProps } from "@react-navigation/native";
import DateBox from "../components/DateBox";
import { getFiltersByDateStrings, getFiltersByTransactionStrings } from "../services/filter_service";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";

type Props = CompositeScreenProps<HomeStackScreenProps<"FilterScreen">, SettingsStackScreenProps<"FilterScreen">>;

export default function FilterScreen({ route, navigation }: Props) {
    const type = getCurrencyType(route.params.walletAddress);
    const filtersByTransaction = getFiltersByTransactionStrings(type);

    const filtersByDate = getFiltersByDateStrings();

    const [filterByTransaction, setFilterByTransaction] = React.useState(route.params.filters[0] || filtersByTransaction[0]);
    const [filterByDate, setFilterByDate] = React.useState(route.params.filters[1] || filtersByDate[0]);

    type RadioProps = {
        value: string;
        setValue: React.Dispatch<React.SetStateAction<string>>;
        options: string[];
    };

    const areFiltersDefault = filterByTransaction === filtersByTransaction[0] && filterByDate === filtersByDate[0];

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
    }, [filterByTransaction, filterByDate]);

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
            <Box marginTop="20px" />
            {filterByDate === filtersByDate[filtersByDate.length - 1] && <CustomDates />}
            <Button
                style={
                    filterByTransaction === route.params.filters[0] && filterByDate === route.params.filters[1]
                        ? styles.applyButtonDisabled
                        : styles.applyButton
                }
                disabled={filterByTransaction === route.params.filters[0] && filterByDate === route.params.filters[1]}
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
});
