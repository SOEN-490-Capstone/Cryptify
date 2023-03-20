import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import React from "react";
import { StyleSheet } from "react-native";
import { HStack, Text, Pressable, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { farChevronDown } from "../icons/regular/farChevronDown";
import { farChevronUp } from "../icons/regular/farChevronUp";
import Collapsible from "react-native-collapsible";
import { displayDataMap } from "../../constants/CurrenciesDisplayData";
import { Copy } from "../Copy";

type Props = {
    addresses: string[];
    type: CurrencyType;
};

export default function CollapsibleAddressSection({ addresses, type }: Props) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const icon = isCollapsed ? (
        <FontAwesomeIcon style={styles.chevronIcon} size={18} icon={farChevronDown} />
    ) : (
        <FontAwesomeIcon style={styles.chevronIcon} size={18} icon={farChevronUp} />
    );

    return (
        <VStack space={"15px"}>
            <Pressable onPress={() => setIsCollapsed(!isCollapsed)} testID={`walletCollapsibleButton${type}`}>
                <HStack>
                    <FontAwesomeIcon
                        style={{ ...displayDataMap[type].styles, marginRight: 10 }}
                        icon={displayDataMap[type].icon}
                        size={26}
                    />
                    <Text fontWeight={"semibold"} size={"title3"}>
                        {titleCase(type)} Wallets
                    </Text>
                    {icon}
                </HStack>
            </Pressable>
            {/* @ts-expect-error this is a known type error in the dependency a pr was made to address the issue but never merged */}
            <Collapsible collapsed={isCollapsed}>
                <VStack space={"15px"}>
                    {addresses.map((address) => (
                        <HStack space="10px" key={address} alignItems={"center"}>
                            <Text flex={1}>{address}</Text>
                            {<Copy label={`${titleCase(type)} address`} value={address} />}
                        </HStack>
                    ))}
                </VStack>
            </Collapsible>
        </VStack>
    );
}

const styles = StyleSheet.create({
    chevronIcon: {
        marginLeft: "auto",
        marginRight: 5,
        color: "#A3A3A3",
    },
});
