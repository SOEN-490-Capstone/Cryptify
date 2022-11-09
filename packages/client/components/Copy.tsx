import { StyleSheet } from "react-native";
import { Box, Pressable, Text, useToast } from "native-base";
import React from "react";
import * as Clipboard from "expo-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCopy } from "./icons/regular/faCopy";
type Props = {
    label: string;
    value: string;
};

export function Copy({ label, value }: Props) {
    const toast = useToast();

    async function copyToClipboard(valueToCopy: string) {
        await Clipboard.setStringAsync(valueToCopy);
    }

    // To do Refactor Toast styling and custom render to overide native base to avoid code duplicates.
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
                                <Text style={styles.toastText}>{label} copied to clipboard</Text>
                            </Box>
                        );
                    },
                });
            }}
        >
            <FontAwesomeIcon icon={faCopy} style={styles.copyIcon} size={20} />
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
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 14,
        paddingHorizontal: 25.5,
        paddingVertical: 10.5,
    },
});
