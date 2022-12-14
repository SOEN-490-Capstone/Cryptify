import React from "react";
import { Text, Box } from "native-base";

type RowItemsProps = {
    label: string;
    value: string;
};

export default function RowItem({ label, value }: RowItemsProps) {
    return (
        <>
            <Text size={"subheadline"} color={"text.500"}>
                {label}
            </Text>
            <Text>{value}</Text>
            <Box marginTop="20px"></Box>
        </>
    );
}
