import React from "react";
import { HStack, Pressable, Text, VStack } from "native-base";
import { Copy } from "../Copy";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farChevronRight } from "../icons/regular/farChevronRight";

type MultiLineListItemProps = {
    label: string;
    value: string;
    altValue?: string;
    copy?: boolean;
    labelCopy?: string;
    inlineLink?: () => void;
};

export default function MultiLineListItem({
    label,
    value,
    altValue,
    copy,
    labelCopy,
    inlineLink,
}: MultiLineListItemProps) {
    const item = (
        <VStack space={"3px"}>
            <Text size={"subheadline"} color={"text.500"}>
                {label}
            </Text>
            {altValue && <Text flex={1}>{altValue}</Text>}
            <HStack space="10px">
                <Text flex={1} minWidth={250}>
                    {value}
                </Text>
                {copy && <Copy label={labelCopy ? labelCopy : label} value={value} />}
            </HStack>
        </VStack>
    );

    return !!inlineLink ? (
        <Pressable onPress={inlineLink}>
            <HStack alignItems="center">
                {item}
                <FontAwesomeIcon icon={farChevronRight} style={styles.chevronRightIcon} size={16} />
            </HStack>
        </Pressable>
    ) : (
        item
    );
}

const styles = StyleSheet.create({
    chevronRightIcon: {
        color: "#A3A3A3",
        marginLeft: "auto",
    },
});
