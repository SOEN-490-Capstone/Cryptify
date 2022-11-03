import {StyleSheet } from "react-native";
import { Box, Pressable, Text, useToast } from "native-base";
import React from "react";
import * as Clipboard from "expo-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCopyCustom } from "./icons/faCopyCustom";
type Props = {
    label: string;
    value: string;
};

export function Copy({ label, value }: Props) {
    const toast = useToast();

    const copyToClipboard = async (valueToCopy: string) => {
        await Clipboard.setStringAsync(valueToCopy);
    };


    return (
        <Pressable onPress={() => {
            copyToClipboard(value);
            toast.show({
                placement: "top",
                duration: 2000,
                render: () => {
                    return <Box style={styles.toastBox}><Text style={styles.toastText}>{label} copied to clipboard</Text></Box>
                },
            })
        }}>
            <FontAwesomeIcon icon={faCopyCustom} style={styles.copyIcon} size={20} />
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
    }
});




{/* <Pressable onPress={() => {
    copyToClipboard(address);
    toast.show({
        placement: "top",
        duration: 2000,
        render: () => {
            return <Box style={styles.toastBox}><Text style={styles.toastText}>address copied to clipboard</Text></Box>
        },
    })
}}> */}