import { Pressable } from "native-base";
import React from "react";
import { farArrowLeft } from "./icons/regular/farArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function BackButton(navigation: any) {
    return (
        <>
            <Pressable onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={farArrowLeft} size={20} />
            </Pressable>
        </>
    );
}
