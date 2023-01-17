import React from "react";
import { HStack, Text } from "native-base";

type SingleLineListItemProps = {
    label: string;
    value: string | React.ReactNode;
};

export default function SingleLineListItem({ label, value }: SingleLineListItemProps) {
    return (
        <>
            <HStack justifyContent="space-between">
                <Text>{label}</Text>
                <Text color={"text.500"}>{value}</Text>
            </HStack>
        </>
    );
}
