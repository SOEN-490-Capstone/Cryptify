import { View } from "../../components/Themed";
import {Alert, StyleSheet} from "react-native";
import {Text, Radio, Box, Button, HStack, Link, ScrollView} from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import { CompositeScreenProps } from "@react-navigation/native";
import DateBox from "../../components/DateBox";
import { getFiltersByDateStrings, getFiltersByTransactionStrings } from "../../services/filter_service";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import {AuthContext} from "../../components/contexts/AuthContext";

export default function TransactionHistoryReportScreen({ route, navigation }: HomeStackScreenProps<"TransactionHistoryReportScreen">) {
    const { token, user } = React.useContext(AuthContext);
    
    const [filters, setFilters] = React.useState<String[]>([]);
    const type = getCurrencyType(route.params.walletAddress);
    const filtersByTransaction = getFiltersByTransactionStrings(type);

    const filtersByDate = getFiltersByDateStrings();

    const [filterByTransaction, setFilterByTransaction] = React.useState(
        filtersByTransaction[0],
    );
    const [filterByDate, setFilterByDate] = React.useState(filtersByDate[0]);
    
    const filtersByFile = ["CSV"];
    const [filterByFile, setFilterByFile] = React.useState(filtersByFile[0]);

    type RadioProps = {
        value: string;
        setValue: React.Dispatch<React.SetStateAction<string>>;
        options: string[];
        isDisabled?: boolean;
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
                    setFilters([filtersByTransaction[0], filtersByDate[0]]);
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

    function RadioGroup({ options, value, setValue, isDisabled }: RadioProps) {
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
                        <Radio key={option} value={option} color={"darkBlue.500"} isDisabled={isDisabled}>
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
                <Text fontWeight={"semibold"} color={"text.500"}>
                    Filter by transaction
                </Text>
                <RadioGroup options={filtersByTransaction} value={filterByTransaction} setValue={setFilterByTransaction} />
                <Text marginTop="30px" fontWeight={"semibold"} color={"text.500"}>
                    Filter by date
                </Text>
                <RadioGroup options={filtersByDate} value={filterByDate} setValue={setFilterByDate} />
                <Text marginTop="30px" fontWeight={"semibold"} color={"text.500"}>
                    File format
                </Text>
                <RadioGroup options={filtersByFile} value={filterByFile} setValue={setFilterByFile} isDisabled={true} />
                <Box marginTop="20px" />
                {filterByDate === filtersByDate[filtersByDate.length - 1] && <CustomDates />}
                <Button
                    style={styles.applyButton}
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
                        
                        Alert.alert("Transaction History Sent", `The Transaction History document for ${route.params.walletName} will be sent to you shortly by email at ${user.email}.`, [
                            { text: "Ok", style: "cancel" },
                        ]);
                    }}
                    testID="emailDocumentSubmit"
                >
                    Email document
                </Button>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: 10,
    },
    scrollView: {
        paddingHorizontal: 15,
    },
    RadioItem: {
        marginTop: 20,
    },
    applyButton: {
        marginTop: 20,
        marginBottom: 10,
    },
});
