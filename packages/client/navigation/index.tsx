import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import {
    GuestStackParamList,
    HomeStackParamList,
    RootStackParamList,
    RootTabParamList,
    SettingsStackParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SignInScreen from "../screens/SignInScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fasHouse } from "../components/icons/solid/fasHouse";
import { fasBars } from "../components/icons/solid/fasBars";
import AddWalletSelectionScreen from "../screens/add-wallet/AddWalletSelectionScreen";
import ViewWalletsScreen from "../screens/ViewWalletsScreen";
import AddWalletScreen from "../screens/add-wallet/AddWalletScreen";
import { Pressable } from "native-base";
import { farXMark } from "../components/icons/regular/farXMark";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { RouteProp } from "@react-navigation/core/src/types";
import { farPlus } from "../components/icons/regular/farPlus";
import { farBarsFilter } from "../components/icons/regular/farBarsFilter"  
import WelcomeScreen from "../screens/WelcomeScreen";
import { AuthContext } from "../components/contexts/AuthContext";
import HomeHeader from "../components/HomeHeader";
import TransactionDetailsScreen from "../screens/TransactionDetailsScreen";
import WalletDetailsScreen from "../screens/WalletDetailsScreen";
import WalletOverviewScreen from "../screens/WalletOverviewScreen";
import TransactionsListScreen from "../screens/TransactionsListScreen";
import WalletQRCodeScreen from "../screens/WalletQRCodeScreen";
import { AddressShareButton } from "../components/AddressShareButton";
import WalletSettingsScreen from "../screens/WalletSettingsScreen";
import TagsSettingsScreen from "../screens/TagsSettingsScreen";
import FilterScreen from "../screens/FilterScreen";

// TODO refactor this file to reduce code duplication and see if
// there is a way to centralize some of the styling between
// navigation stacks

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackScreen({ navigation, route }: { route: RouteProp<any, any>; navigation: any }) {
    React.useLayoutEffect(() => {
        const tabHiddenRoutes = [
            "AddWalletSelectionScreen",
            "AddWalletScreen",
            "WalletOverviewScreen",
            "WalletDetailsScreen",
        ];
        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route) || "")) {
            navigation.setOptions({ tabBarStyle: { display: "none" } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: "flex" } });
        }
    }, [navigation, route]);

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerTitle: () => <HomeHeader />,
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 28,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                }}
            />
            <HomeStack.Screen
                name="AddWalletSelectionScreen"
                component={AddWalletSelectionScreen}
                options={{
                    title: "Wallets",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
            />
            <HomeStack.Screen
                name="AddWalletScreen"
                component={AddWalletScreen}
                options={({ navigation }) => ({
                    title: "",
                    headerTintColor: "#404040",
                    headerShadowVisible: false,
                    headerRight: () => (
                        <Pressable
                            onPress={() => {
                                navigation.goBack();
                                navigation.goBack();
                            }}
                        >
                            <FontAwesomeIcon icon={farXMark} color="#404040" size={22} />
                        </Pressable>
                    ),
                })}
            />
            <HomeStack.Screen
                name="TransactionDetailsScreen"
                component={TransactionDetailsScreen}
                options={({ route }) => ({
                    title: route.params.title,
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                })}
            />
            <HomeStack.Screen
                name="WalletOverviewScreen"
                component={WalletOverviewScreen}
                options={({ route }) => ({
                    title: route.params.title,
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                })}
            />
            <HomeStack.Screen
                name="WalletDetailsScreen"
                component={WalletDetailsScreen}
                options={{
                    title: "Details",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
            />
             <HomeStack.Screen
                name="TransactionsListScreen"
                component={TransactionsListScreen}
                options={({ navigation }) => ({
                    title: "Transactions",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <Pressable onPress={() => {navigation.navigate("FilterScreen")}}>
                            <FontAwesomeIcon icon={farBarsFilter} size={20}/>
                        </Pressable>
                    )
                })}
            />
            <HomeStack.Screen
                name="FilterScreen"
                component={FilterScreen}
                options={{
                    title: "Filter",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
            />
            <HomeStack.Screen
                name="WalletQRCodeScreen"
                component={WalletQRCodeScreen}
                options={({ route }) => ({
                    title: "QR Code",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <AddressShareButton currencyType={route.params.currencyType} address={route.params.address} />
                    ),
                })}
            />
        </HomeStack.Navigator>
    );
}

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsStackScreen({ navigation, route }: { route: RouteProp<any, any>; navigation: any }) {
    React.useLayoutEffect(() => {
        const tabHiddenRoutes = [
            "ViewWalletsScreen",
            "AddWalletSelectionScreen",
            "AddWalletScreen",
            "WalletSettingsScreen",
            "TagsSettingsScreen",
        ];
        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route) || "")) {
            navigation.setOptions({ tabBarStyle: { display: "none" } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: "flex" } });
        }
    }, [navigation, route]);
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: "Settings",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 28,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                }}
            />
            <SettingsStack.Screen
                name="ViewWalletsScreen"
                component={ViewWalletsScreen}
                options={({ navigation }) => ({
                    title: "Wallets",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <Pressable onPress={() => navigation.navigate("AddWalletSelectionScreen")}>
                            <FontAwesomeIcon icon={farPlus} color="#404040" size={22} />
                        </Pressable>
                    ),
                })}
            />
            <SettingsStack.Screen
                name="WalletSettingsScreen"
                component={WalletSettingsScreen}
                options={({ route }) => ({
                    title: route.params.title,
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                })}
            />
            <SettingsStack.Screen
                name="TagsSettingsScreen"
                component={TagsSettingsScreen}
                options={{
                    title: "Tags",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
            />
            <SettingsStack.Screen
                name="AddWalletSelectionScreen"
                component={AddWalletSelectionScreen}
                options={{
                    title: "Wallets",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
            />
            <SettingsStack.Screen
                name="AddWalletScreen"
                component={AddWalletScreen}
                options={({ navigation }) => ({
                    title: "",
                    headerTintColor: "#404040",
                    headerShadowVisible: false,
                    headerRight: () => (
                        <Pressable
                            onPress={() => {
                                navigation.goBack();
                                navigation.goBack();
                            }}
                        >
                            <FontAwesomeIcon icon={farXMark} color="#404040" size={22} />
                        </Pressable>
                    ),
                })}
            />
            <SettingsStack.Screen
                name="TransactionDetailsScreen"
                component={TransactionDetailsScreen}
                options={({ route }) => ({
                    title: route.params.title,
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                })}
            />
            <SettingsStack.Screen
                name="WalletOverviewScreen"
                component={WalletOverviewScreen}
                options={({ route }) => ({
                    title: route.params.title,
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                })}
            />
            <SettingsStack.Screen
                name="WalletDetailsScreen"
                component={WalletDetailsScreen}
                options={{
                    title: "Details",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
            />
            <SettingsStack.Screen
                name="TransactionsListScreen"
                component={TransactionsListScreen}
                options={({ navigation }) => ({
                    title: "Transactions",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <Pressable onPress={()=> {navigation.navigate("FilterScreen")}}>
                            <FontAwesomeIcon icon={farBarsFilter} size={20}/>
                        </Pressable>
                    )
                })}
            />
            <SettingsStack.Screen
                name="FilterScreen"
                component={FilterScreen}
                options={{
                    title: "Filter",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
            />
            <HomeStack.Screen
                name="WalletQRCodeScreen"
                component={WalletQRCodeScreen}
                options={({ route }) => ({
                    title: "QR Code",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <AddressShareButton currencyType={route.params.currencyType} address={route.params.address} />
                    ),
                })}
            />
        </SettingsStack.Navigator>
    );
}

const GuestStack = createNativeStackNavigator<GuestStackParamList>();

function GuestStackScreen() {
    return (
        <GuestStack.Navigator>
            <GuestStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
            <GuestStack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={({ navigation }) => ({
                    title: "",
                    headerTintColor: "#404040",
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerRight: () => (
                        <Pressable
                            onPress={() => {
                                navigation.goBack();
                            }}
                            testID="headerRightButton"
                        >
                            <FontAwesomeIcon icon={farXMark} color="#404040" size={22} />
                        </Pressable>
                    ),
                })}
            />
            <GuestStack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    title: "",
                    headerTintColor: "#404040",
                    headerShadowVisible: false,
                }}
            />
        </GuestStack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    const tabBarIcon =
        (icon: IconDefinition) =>
        ({ color }: { color: string }) =>
            <FontAwesomeIcon icon={icon} color={color} size={22} />;

    return (
        <BottomTab.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
                tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
                tabBarLabelPosition: "below-icon",
                tabBarLabelStyle: {
                    paddingBottom: 2,
                },
                headerShown: false,
            }}
        >
            <BottomTab.Screen
                name="HomeStack"
                component={HomeStackScreen}
                options={{
                    title: "Home",
                    tabBarIcon: tabBarIcon(fasHouse),
                    tabBarTestID: "homeTab",
                }}
            />
            <BottomTab.Screen
                name="SettingsStack"
                component={SettingsStackScreen}
                options={{
                    title: "Settings",
                    tabBarIcon: tabBarIcon(fasBars),
                    tabBarTestID: "settingsTab",
                }}
            />
        </BottomTab.Navigator>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    const { token } = React.useContext(AuthContext);
    const isSignedIn = !!token;

    return (
        <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
                {isSignedIn ? (
                    <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="Guest" component={GuestStackScreen} options={{ headerShown: false }} />
                )}
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
