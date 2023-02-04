import React from "react";
import { View, Animated, Easing } from "react-native";

const LoadingSpinner = () => {
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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Animated.Image
                style={{ transform: [{ rotate: spin }] }}
                source={require("../assets/images/Spinner.png")}
            />
        </View>
    );
};

export default LoadingSpinner;
