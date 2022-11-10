import { StyleSheet } from "react-native";
import { Box, Pressable, Text, useToast } from "native-base";
import React from "react";
import * as Clipboard from "expo-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farCopy } from "./icons/regular/farCopy";
type Props = {
    label: string;
    value: string;
};

export function Copy({ label, value }: Props) {
    const toast = useToast();

    async function copyToClipboard(valueToCopy: string) {
        await Clipboard.setStringAsync(valueToCopy);
    }

    // TODO Refactor Toast styling and custom render to override native base to avoid code duplicates.
    return (
        <Pressable
            onPress={() => {
                copyToClipboard(value);
                toast.show({
                    placement: "top",
                    duration: 2000,
                    render: () => {
                        return (
                            <Box style={styles.toastBox}>
                                <Text
                                    size={"footnote1"}
                                    fontWeight={"semibold"}
                                    color={"white"}
                                    style={styles.toastText}
                                >
                                    {label} copied to clipboard
                                </Text>
                            </Box>
                        );
                    },
                });
            }}
        >
            <FontAwesomeIcon icon={farCopy} style={styles.copyIcon} size={20} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    copyIcon: {
        //darkBlue.500
        color: "#0077E6",
        paddingHorizontal: 10,
    },
    toastBox: {
        backgroundColor: "#404040",
        borderRadius: 100,
    },
    toastText: {
        paddingHorizontal: 25.5,
        paddingVertical: 10.5,
    },
});
