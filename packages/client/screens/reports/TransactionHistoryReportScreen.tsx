import { View } from "../../components/Themed";
import { Alert, StyleSheet } from "react-native";
import { Text, Radio, Box, Button, HStack, Link, ScrollView } from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import DateBox from "../../components/DateBox";
import { getFiltersByDateStrings, getFiltersByTransactionStrings } from "../../services/filter_service";
import { getCurrencyType } from "@cryptify/common/src/utils/currency_utils";
import { AuthContext } from "../../components/contexts/AuthContext";
import { ReportsGateway } from "../../gateways/reports_gateway";
import { CreateTransactionHistoryReportRequest } from "@cryptify/common/src/requests/create_transaction_history_report_request";
import { FileType } from "@cryptify/common/src/validations/create_transaction_history_report_schema";

type RadioProps = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    options: string[];
    isDisabled?: boolean;
};

export default function TransactionHistoryReportScreen({
    route,
    navigation,
}: HomeStackScreenProps<"TransactionHistoryReportScreen">) {
    const reportsGateway = new ReportsGateway();

    const { token, user } = React.useContext(AuthContext);

    const filtersByTransaction = getFiltersByTransactionStrings(getCurrencyType(route.params.walletAddress));
    const [filterByTransaction, setFilterByTransaction] = React.useState(filtersByTransaction[0]);

    const filtersByDate = getFiltersByDateStrings();
    const [filterByDate, setFilterByDate] = React.useState(filtersByDate[0]);

    const filtersByFile = ["CSV"];
    const [filterByFile, setFilterByFile] = React.useState(filtersByFile[0]);

    React.useEffect(() => {
        (() => {
            const areFiltersDefault =
                filterByTransaction === filtersByTransaction[0] && filterByDate === filtersByDate[0];
            navigation.setOptions({
                headerRight: () => !areFiltersDefault && <ResetLink />,
            });
        })();
    }, [filterByTransaction, filterByDate]);

    function getYearStart() {
        const date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        return +date;
    }

    async function onPress(): Promise<void> {
        const startDate =
            filterByDate === filtersByDate[0]
                ? 0
                : filterByDate === filtersByDate[1]
                ? +new Date() - 1000 * 60 * 60 * 24 * 90
                : filterByDate === filtersByDate[2]
                ? getYearStart()
                : filterByDate === filtersByDate[3]
                ? getYearStart() - 1000 * 60 * 60 * 24 * 365
                : +(fromDate || 0);

        const endDate =
            filterByDate === filtersByDate[0]
                ? +new Date() + 1000 * 60 * 60 * 24
                : filterByDate === filtersByDate[1]
                ? +new Date() + 1000 * 60 * 60 * 24
                : filterByDate === filtersByDate[2]
                ? getYearStart() + 1000 * 60 * 60 * 24 * 365
                : filterByDate === filtersByDate[3]
                ? getYearStart() - 1000 * 60 * 60 * 24
                : +(fromDate || 0);

        const req = {
            userId: user.id,
            walletAddress: route.params.walletAddress,
            currencyType: getCurrencyType(route.params.walletAddress),
            transactionsIn: filterByTransaction === "All transactions" || filterByTransaction.endsWith("in"),
            transactionsOut: filterByTransaction === "All transactions" || filterByTransaction.endsWith("out"),
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            fileType: FileType.CSV,
        } as CreateTransactionHistoryReportRequest;

        try {
            await reportsGateway.createTransactionHistoryReport(req, token);

            Alert.alert(
                "Transaction History Sent",
                `The Transaction History document for ${route.params.walletName} will be sent to you shortly by email at ${user.email}.`,
                [{ text: "Ok", style: "cancel" }],
            );
        } catch (e) {
            Alert.alert(
                "Transaction History Error",
                `An error occured while generating the Transaction History document for ${route.params.walletName}, please try again later.`,
                [{ text: "Ok", style: "cancel" }],
            );
        }
    }

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
                }}
            >
                Reset
            </Link>
        );
    }

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
                <RadioGroup
                    options={filtersByTransaction}
                    value={filterByTransaction}
                    setValue={setFilterByTransaction}
                />
                <Text marginTop="30px" fontWeight={"semibold"} color={"text.500"}>
                    Filter by date
                </Text>
                <RadioGroup options={filtersByDate} value={filterByDate} setValue={setFilterByDate} />
                <Box marginTop="20px" />
                {filterByDate === filtersByDate[filtersByDate.length - 1] && <CustomDates />}
                <Text marginTop="30px" fontWeight={"semibold"} color={"text.500"}>
                    File format
                </Text>
                <RadioGroup options={filtersByFile} value={filterByFile} setValue={setFilterByFile} isDisabled={true} />
                <Button
                    style={styles.applyButton}
                    onPress={() => onPress()}
                    testID="emailDocumentSubmit"
                    isDisabled={filterByDate === "Custom Dates" && (!fromDate || !toDate)}
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
