import "@env";
import {StatusBar} from "expo-status-bar";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import {NativeBaseProvider} from "native-base";
import React from "react";
import extendTheme from "./theme/extendTheme";
import StorageService from "./services/storage_service";
import {JwtToken} from "@cryptify/common/src/domain/jwt_token";
import {AuthContext } from "./components/contexts/AuthContext";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const theme = extendTheme();

    const [token, setToken] = React.useState("");
    // Define the auth context passed to the rest of the application
    // using the token state defined in the root
    const authContext = {
        setToken,
        token,
    };

    // Runs only once on app startup and sets the token from local storage
    React.useEffect(() => {
        (async () => {
            const token = await StorageService.get<JwtToken>("@jwt");
            setToken(token?.accessToken || "");
        })();
    }, []);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <AuthContext.Provider value={authContext}>
                <NativeBaseProvider theme={theme}>
                    <StatusBar />
                    <Navigation colorScheme={colorScheme} />
                </NativeBaseProvider>
            </AuthContext.Provider>
        );
    }
}
