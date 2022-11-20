import React from "react";
import { Actionsheet, useDisclose, Radio, Text, HStack, Pressable } from "native-base";
import { StyleSheet } from "react-native";
import { faSort } from "../components/icons/regular/farSort";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View } from "../components/Themed";

// interface Props {
//     setSortValue: [string, React.Dispatch<React.SetStateAction<string>>];
//   }

type Props = {
    sortTransactionListValue: string;
    setTransactionListSortValue: React.Dispatch<React.SetStateAction<string>>;
};

function SortTransactionListScreen({ sortTransactionListValue, setTransactionListSortValue }: Props) {
    const { isOpen, onOpen, onClose } = useDisclose();

    const onPressReset = () => {
        setTransactionListSortValue("sortDateNewest");
    };

    return (
        <>
            <View>
                <Pressable onPress={onOpen}>
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
                                    sortTransactionListValue == "sortDateNewest"
                                        ? styles.resetStyleInvisible
                                        : styles.resetStyleVisible
                                }
                            >
                                Reset
                            </Text>
                        </HStack>

                        <Radio.Group
                            name="transactionSort"
                            accessibilityLabel="transSort"
                            value={sortTransactionListValue}
                            onChange={(nextValue: string) => {
                                setTransactionListSortValue(nextValue);
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

export default SortTransactionListScreen;

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
