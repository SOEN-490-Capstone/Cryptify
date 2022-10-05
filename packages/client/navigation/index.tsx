/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SignInScreen from "../screens/SignInScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { houseNav } from "../components/icons/houseNav";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                tabBarLabelPosition: "below-icon",
                tabBarInactiveTintColor: "#404040",

                tabBarStyle: {
                    height: 78,
                    paddingTop: 8,
                    paddingHorizontal: 8,
                },

                tabBarLabelStyle: {
                    height: 34,
                    lineHeight: 16,
                    fontSize: 12,
                    fontWeight: "400",
                    letterSpacing: 0.5,
                },

                headerTintColor: "#404040",
                headerTitleStyle: {
                    fontSize: 28,
                    lineHeight: 37,
                    fontWeight: "600",
                },
                headerShadowVisible: false,
            }}
        >
            <BottomTab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: "Home",
                    // Note: Trying out the home button icon imported from FontAwesome
                    tabBarIcon: ({ color }) => <FontAwesomeIcon icon={houseNav} color={color} size={30} />,
                }}
            />
            <BottomTab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    title: "Sign Up",
                    tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
                    headerShown: false,
                }}
            />
            <BottomTab.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    title: "Sign In",
                    tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
                    headerShown: false,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
