import { View } from "../components/Themed";
import { Pressable, StyleSheet} from "react-native";
import { Text, Radio, Box, Button} from "native-base";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../types";
import React, { useState} from "react";
import { CompositeScreenProps } from "@react-navigation/native";
//import RNDateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

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
            { options.map((option) => (<Box style={styles.RadioItem}><Radio key={option} value={option}>{option}</Radio></Box>))}
        </Radio.Group>
        )
    }

    // const [fromDate, setFromDate] = useState(new Date());
    // const [toDate, setToDate] = useState(null);

    // function CustomDatePicker(){
    //    return (
    //         <Pressable style={styles.Date}>
    //             <RNDateTimePicker value={new Date()}/>
    //         </Pressable>
    //     )
    // }
    const DateC = () => {
        const [date, setDate] = useState(new Date())
        const [open, setOpen] = useState(false)
      
        return (
          <>
            <Button onPress={() => setOpen(true)}>TEST</Button>
            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </>
        )
      }

    return (
        <View style={styles.view}>
            <Text fontWeight={"semibold"}>Filter by transaction</Text>
            <RadioGroup options={filtersByTransaction} value={filterByTransaction} setValue={setFilterByTransaction}/>
            <Text marginTop="20px" fontWeight={"semibold"}>Filter by date</Text>
            <RadioGroup options={filtersByDate} value={filterByDate} setValue={setFilterByDate}/>
            <Box marginTop="26px"/>
            <DateC/>
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
    }
});