import React from "react";
import { HStack, Text, VStack } from "native-base";
import { Copy } from "../Copy";

type RowItemsProps = {
    label: string;
    value: string;
    copy?: boolean;
    labelCopy?: string;
};

export default function MultiLineListItem({ label, value, copy, labelCopy }: RowItemsProps) {
    return (
        <>
            <VStack space={"3px"}>
                <Text size={"subheadline"} color={"text.500"}>
                    {label}
                </Text>
                <HStack space="10px">
                    <Text flex={1}>{value}</Text>
                    {copy && <Copy label={labelCopy ? labelCopy : label} value={value} />}
                </HStack>
            </VStack>
        </>
    );
}
