import React from "react";
import { Animated, Easing } from "react-native";

export default function LoadingSpinner() {
    const spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.linear,
        }),
    ).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <Animated.Image style={{ transform: [{ rotate: spin }] }} source={require("../assets/images/Spinner.png")} />
    );
}
