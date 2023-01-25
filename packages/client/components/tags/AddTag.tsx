import { HStack, Pressable, Text } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farPlus } from "../icons/regular/farPlus";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
    onPress: () => void | Promise<void>;
};

export default function AddTag({ onPress }: Props) {
    return (
        <Pressable
            onPress={() => {
                onPress();
            }}
            borderRadius={"8px"}
            backgroundColor="darkBlue.50"
            borderColor={"darkBlue.500"}
            style={styles.badge}
            borderWidth={"2px"}
            borderStyle={"dashed"}
            testID="addNewTagButton"
        >
            <HStack space={"10px"} alignItems={"center"}>
                <Text size={"subheadline"} fontWeight={"semibold"} color={"darkBlue.500"}>
                    Add
                </Text>
                <FontAwesomeIcon icon={farPlus} size={14} color="#0077E6" />
            </HStack>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    badge: {
        marginBottom: 13,
        height: 36,
        width: 85,
        alignItems: "center",
        justifyContent: "center",
    },
});
