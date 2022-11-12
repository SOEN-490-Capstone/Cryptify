import { Pressable, StyleProp, ViewStyle, StyleSheet} from "react-native";
import { Text, Box, HStack} from "native-base";
import React, { useState} from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farBarsFilter } from "../components/icons/regular/farBarsFilter";
import { falCalendar } from "./icons/light/falCalendar";

type DateBoxProps = {
    label: string,
    date: Date | null,
    setDate:  React.Dispatch<React.SetStateAction<Date | null>>,
    maximumDate?: Date | null,
    minimumDate?: Date | null,
    style?:  any,
 }

export default function DateBox({label, style, date, setDate, maximumDate, minimumDate}: DateBoxProps) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date: Date) => {
        setDate(date);
        hideDatePicker();
    };
  
    return (
      <Box style={{...styles.box, ...style}}>
        <Pressable onPress={showDatePicker}>
            <HStack justifyContent="space-between">
                <Text color={date ? "text.600" : "text.300"}>{date ? date.toLocaleDateString([], {year: "2-digit", month: "2-digit", day: "2-digit"}): label}</Text>
                <FontAwesomeIcon icon={falCalendar} size={20}/>
            </HStack>
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          display="inline"
          {...(maximumDate && {maximumDate})}
          {...(minimumDate && {minimumDate})}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </Box>
    );
  };


const styles = StyleSheet.create({
    box: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D4D4D4",
        paddingHorizontal: 12,
        paddingVertical: 14.5,
    },
});