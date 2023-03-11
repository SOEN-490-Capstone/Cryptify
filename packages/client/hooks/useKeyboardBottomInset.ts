import { Keyboard, Platform } from "react-native";
import React from "react";

export const useKeyboardBottomInset = () => {
    const [bottom, setBottom] = React.useState(0);
    const subscriptions = React.useRef<any>([]);

    React.useEffect(() => {
        subscriptions.current = [
            Keyboard.addListener("keyboardDidHide", () => setBottom(0)),
            Keyboard.addListener("keyboardDidShow", (e) => {
                if (Platform.OS === "android") {
                    setBottom(e.endCoordinates.height);
                } else {
                    setBottom(Math.max(e.startCoordinates?.height || 0, e.endCoordinates.height));
                }
            }),
        ];

        return () => {
            subscriptions.current.forEach((subscription: any) => {
                subscription.remove();
            });
        };
    }, [setBottom, subscriptions]);

    return bottom;
};
