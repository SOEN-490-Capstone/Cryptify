import { View } from "../components/Themed";
import { Pressable, StyleProp, StyleSheet, ViewStyle} from "react-native";
import { Text, Radio, Box, Button, HStack} from "native-base";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import React, { useState} from "react";
import { CompositeScreenProps } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farBarsFilter } from "../components/icons/regular/farBarsFilter";
import DateBox from "../components/DateBox";

type Props = CompositeScreenProps<
    HomeStackScreenProps<"FilterScreen">,
    SettingsStackScreenProps<"FilterScreen">
>;

export default function FilterScreen({ route, navigation }: Props) {



    const filtersByTransaction = ["All transactions", "Ethereum in", "Ethereum out"];

    const currentYear = new Date().getFullYear();
    const previousYear = (currentYear - 1);

    const filtersByDate = ["All transactions", "Past 90 days", currentYear.toString(), previousYear.toString(), "Custom dates"];

    const [filterByTransaction, setFilterByTransaction] = React.useState(filtersByTransaction[0]);
    const [filterByDate, setFilterByDate] = React.useState(filtersByDate[0]);

    type RadioProps = {
        value: string,
        setValue: React.Dispatch<React.SetStateAction<string>>,
        options: string[],
    }

    function RadioGroup({options, value, setValue}: RadioProps){
        return (
        <Radio.Group
        name="myRadioGroup"
        value={value}
        onChange={(nextValue) => {
            setValue(nextValue);
        }}
        >
            { options.map((option) => (<Box style={styles.RadioItem} key={option}><Radio key={option} value={option}>{option}</Radio></Box>))}
        </Radio.Group>
        )
    }

     const [fromDate, setFromDate] = React.useState<Date | null>(null);
     const [toDate, setToDate] = React.useState<Date | null>(null);

     function CustomDates(){
        return (            
        <HStack>
            <DateBox label="from" style={{ marginRight:13 }} date={fromDate} maximumDate={toDate} setDate={setFromDate}/>
            <DateBox label="to" date={toDate} minimumDate={fromDate} setDate={setToDate}/>
        </HStack>
        )
    }

    return (
        <View style={styles.view}>
            <Text fontWeight={"semibold"}>Filter by transaction</Text>
            <RadioGroup options={filtersByTransaction} value={filterByTransaction} setValue={setFilterByTransaction}/>
            <Text marginTop="20px" fontWeight={"semibold"}>Filter by date</Text>
            <RadioGroup options={filtersByDate} value={filterByDate} setValue={setFilterByDate}/>
            <Box marginTop="26px"/>
            {filterByDate == filtersByDate.at(filtersByDate.length - 1) ? <CustomDates/> : null}
            <Button style={styles.applyButton} onPress={()=> navigation.goBack()}>Apply filters</Button>
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
        marginTop: 10,
    },
    applyButton: {
        marginTop: "auto",
        marginBottom: 36,
    },
});