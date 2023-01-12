import React from "react";
import { HStack, Text } from "native-base";

type ListItemsProps = {
    label: string;
    value: string;
};

export default function SingleLineListItem({ label, value }: ListItemsProps) {
    return (
        <>
            <HStack justifyContent="space-between">
                <Text>{label}</Text>
                <Text color={"text.500"}>{value}</Text>
            </HStack>
        </>
    );
}
