import React from "react";
import { HStack, Text, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
    label: string;
    value: string;
    icon: IconDefinition;
};

export default function LargeIconMultiLineListItem({ label, value, icon }: Props) {
    return (
        <HStack alignItems="center">
            <FontAwesomeIcon icon={icon} size={26} />
            <VStack ml="25px" flex={1}>
                <Text fontWeight={"semibold"}>{label}</Text>
                <Text color="text.500" size={"footnote1"}>
                    {value}
                </Text>
            </VStack>
        </HStack>
    );
}
