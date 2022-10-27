import { Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { AuthContext } from "./contexts/AuthContext";

export default function HomeHeader() {
    const { user } = React.useContext(AuthContext);

    return (
        <>
            <Text style={styles.headerText}>Hello, </Text>
            <Text style={[styles.headerText, styles.headerName]}>{user.firstName}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 28,
        lineHeight: 37,
    },
    headerName: {
        fontWeight: "600",
        textTransform: "capitalize",
    },
});
