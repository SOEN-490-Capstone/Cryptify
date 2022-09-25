import "@env";
import { StatusBar } from "expo-status-bar";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import React from "react";
import extendTheme from "./theme/extendTheme";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const theme = extendTheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <NativeBaseProvider theme={theme}>
                <StatusBar />
                <Navigation colorScheme={colorScheme} />
            </NativeBaseProvider>
        );
    }
}
