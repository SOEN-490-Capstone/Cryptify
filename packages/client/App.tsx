import "@env";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { StatusBar } from "expo-status-bar";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import React from "react";
import extendTheme from "./theme/extendTheme";
import StorageService from "./services/storage_service";
import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { AuthContext } from "./components/contexts/AuthContext";
import { KEY_JWT } from "./constants/storage_keys";
import { UsersGateway } from "./gateways/users_gateway";
import { User } from "@cryptify/common/src/domain/entities/user";

export default function App() {
    const usersGateway = new UsersGateway();

    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const theme = extendTheme();

    const [isUserDataLoaded, setIsUserDataLoaded] = React.useState(false);
    const [token, setToken] = React.useState("");
    // A bit of a hack, but we are bypassing typescripts type system telling them that
    // user is never null or empty. We can do this because the user object is only
    // used in screens where we know it is present, this avoids having to account for
    // default values that will never be used and if statements that will always be true.
    // This means that the user object should not be used in any of the guest pages, all
    // other pages will have the user hydrated by one of the 3 entry points: this file,
    // sign in, or sign up
    const [user, setUser] = React.useState<User>({} as User);
    // Define the auth context passed to the rest of the application
    // using the token state defined in the root
    const authContext = {
        setToken,
        token,
        setUser,
        user,
    };

    // Runs only once on app startup and sets the token from local storage
    React.useEffect(() => {
        (async () => {
            const token = await StorageService.get<JwtToken>(KEY_JWT);
            setToken(token?.accessToken || "");

            if (token) {
                try {
                    const user = await usersGateway.whoami(token.accessToken);
                    setUser(user);
                } catch (err) {
                    // If a user has an old JWT token that isn't found in the database catch the not found exception
                    // and set the token to an empty string so the user is redirected back to the welcome page
                    setToken("");
                    await StorageService.remove(KEY_JWT);
                }
            }

            setIsUserDataLoaded(true);
        })();
    }, []);

    if (!isLoadingComplete || !isUserDataLoaded) {
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
