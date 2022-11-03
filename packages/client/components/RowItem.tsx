import React from "react";
import { Text, Box } from "native-base";
import { StyleSheet } from "react-native";

type RowItemsProps = {
    label: string;
    value: string;
};

export default function RowItem({ label, value }: RowItemsProps) {
    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
            <Box marginTop="20px"></Box>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "400",
        fontSize: 15,
        lineHeight: 20,
    },
    value: {
        fontSize: 17,
        lineHeight: 23,
    },
});