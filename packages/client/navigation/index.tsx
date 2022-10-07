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
import { HomeStackParamList, RootStackParamList, RootTabParamList, SettingsStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SignInScreen from "../screens/SignInScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouseCustom } from "../components/icons/faHouseCustom";
import { faBarsCustom } from "../components/icons/faBarsCustom";
import AddWalletSelectionScreen from "../screens/add-wallet/AddWalletSelectionScreen";
import ViewWalletsScreen from "../screens/ViewWalletsScreen";
import AddWalletScreen from "../screens/add-wallet/AddWalletScreen";
import { Pressable } from "native-base";
import { faXMarkCustom } from "../components/icons/faXMarkCustom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { RouteProp } from "@react-navigation/core/src/types";

// TODO refactor this file to reduce code duplication and see if
// there is a way to centralize some of the styling between
// navigation stacks

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackScreen({ navigation, route }: { route: RouteProp<any, any>; navigation: any }) {
    React.useLayoutEffect(() => {
        const tabHiddenRoutes = ["AddWalletSelectionScreen", "AddWalletScreen"];
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
                    title: "Home",
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
                            <FontAwesomeIcon icon={faXMarkCustom} color="#404040" size={22} />
                        </Pressable>
                    ),
                })}
            />
        </HomeStack.Navigator>
    );
}

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsStackScreen({ navigation, route }: { route: RouteProp<any, any>; navigation: any }) {
    React.useLayoutEffect(() => {
        const tabHiddenRoutes = ["ViewWalletsScreen", "AddWalletSelectionScreen", "AddWalletScreen"];
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
                            <FontAwesomeIcon icon={faXMarkCustom} color="#404040" size={22} />
                        </Pressable>
                    ),
                })}
            />
        </SettingsStack.Navigator>
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
                tabBarStyle: {
                    paddingBottom: 2,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                headerShown: false,
            }}
        >
            <BottomTab.Screen
                name="HomeStack"
                component={HomeStackScreen}
                options={{
                    title: "Home",
                    tabBarIcon: tabBarIcon(faHouseCustom),
                }}
            />
            <BottomTab.Screen
                name="SettingsStack"
                component={SettingsStackScreen}
                options={{
                    title: "Settings",
                    tabBarIcon: tabBarIcon(faBarsCustom),
                }}
            />
            <BottomTab.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    title: "Sign Up",
                    tabBarIcon: tabBarIcon(faBarsCustom),
                }}
            />
            <BottomTab.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    title: "Sign In",
                    tabBarIcon: tabBarIcon(faBarsCustom),
                }}
            />
        </BottomTab.Navigator>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
                <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
