import { Text } from "native-base";
import React from "react";
import { AuthContext } from "./contexts/AuthContext";

export default function HomeHeader() {
    const { user } = React.useContext(AuthContext);

    return (
        <>
            <Text size={"title1"}>Hello, </Text>
            <Text size={"title1"} fontWeight={"semibold"} textTransform={"capitalize"}>
                {user.firstName}
            </Text>
        </>
    );
}
