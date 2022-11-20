import React from "react";
import { Actionsheet, useDisclose, Radio, Text, HStack, Pressable } from "native-base";
import { StyleSheet } from "react-native";
import { faSort } from "../icons/regular/farSort";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View } from "../Themed";

type Props = {
    sortType: string;
    setSortType: React.Dispatch<React.SetStateAction<string>>;
};

function SortTransactionListComponent({ sortType, setSortType }: Props) {
    const { isOpen, onOpen, onClose } = useDisclose();

    const onPressReset = () => {
        setSortType("sortDateNewest");
    };

    return (
        <>
            <View>
                <Pressable onPress={onOpen} style={{ paddingRight: 4.5 }}>
                    <FontAwesomeIcon icon={faSort} size={19} />
                </Pressable>

                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <HStack style={styles.headerStack}>
                            <Text style={styles.resetStyleInvisible}>Reset</Text>

                            <Text style={styles.headerStyle}>Sort</Text>

                            <Text
                                onPress={onPressReset}
                                style={
                                    sortType == "sortDateNewest" ? styles.resetStyleInvisible : styles.resetStyleVisible
                                }
                            >
                                Reset
                            </Text>
                        </HStack>

                        <Radio.Group
                            name="transactionSort"
                            accessibilityLabel="transSort"
                            value={sortType}
                            onChange={(nextValue: string) => {
                                setSortType(nextValue);
                            }}
                        >
                            <Actionsheet.Item>
                                <Radio value="sortDateNewest">Sort by date: newest first</Radio>
                            </Actionsheet.Item>
                            <Actionsheet.Item>
                                <Radio value="sortDateOldest">Sort by date: oldest first</Radio>
                            </Actionsheet.Item>
                            <Actionsheet.Item>
                                <Radio value="sortAmountHighest">Sort by amount: highest first</Radio>
                            </Actionsheet.Item>
                            <Actionsheet.Item>
                                <Radio value="sortAmountLowest">Sort by amount : lowest first</Radio>
                            </Actionsheet.Item>
                        </Radio.Group>
                    </Actionsheet.Content>
                </Actionsheet>
            </View>
        </>
    );
}

export default SortTransactionListComponent;

const styles = StyleSheet.create({
    headerStack: {
        minWidth: "100%",
        justifyContent: "space-between",
        paddingTop: 12.5,
        paddingBottom: 10,
        paddingHorizontal: 22,
    },
    headerStyle: {
        fontWeight: "600",
        margin: "auto",
        color: "text.700",
    },

    resetStyleInvisible: {
        fontWeight: "600",
        color: "darkBlue.500",
        opacity: 0,
        height: 0,
    },

    resetStyleVisible: {
        fontWeight: "600",
        color: "#0077E6",
    },
});
