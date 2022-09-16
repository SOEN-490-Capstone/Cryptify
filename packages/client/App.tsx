import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ports } from "@cryptify/common/src/ports";
import { NativeBaseProvider } from "native-base";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    console.log(ports.CLIENT);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <NativeBaseProvider>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </SafeAreaProvider>
            </NativeBaseProvider>
        );
    }
}
