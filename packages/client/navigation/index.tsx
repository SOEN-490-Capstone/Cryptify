import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {NavigationContainer, DefaultTheme, DarkTheme, NavigatorScreenParams} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import {HomeStackParamList, RootStackParamList, RootTabParamList, SettingsStackParamList} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SignInScreen from "../screens/SignInScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouseCustom } from "../components/icons/faHouseCustom";
import { faBarsCustom } from "../components/icons/faBarsCustom";
import AddWalletScreen from "../screens/AddWalletScreen";
import ViewWalletsScreen from "../screens/ViewWalletsScreen";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen}/>
            <HomeStack.Screen name="AddWalletScreen" component={AddWalletScreen}/>
        </HomeStack.Navigator>
    );
}

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen}/>
            <SettingsStack.Screen name="ViewWalletsScreen" component={ViewWalletsScreen}/>
            <SettingsStack.Screen name="AddWalletScreen" component={AddWalletScreen}/>
        </SettingsStack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

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
                headerTintColor: "#404040",
                headerTitleStyle: {
                    fontSize: 28,
                    lineHeight: 37,
                    fontWeight: "600",
                },
                headerShadowVisible: false,
                headerShown: false,
            }}
        >
            <BottomTab.Screen
                name="HomeStack"
                component={HomeStackScreen}
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHouseCustom} color={color} size={28} />,
                }}
            />
            <BottomTab.Screen
                name="SettingsStack"
                component={SettingsStackScreen}
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faBarsCustom} color={color} size={28} />,
                }}
            />
            <BottomTab.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    title: "Sign Up",
                    tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    title: "Sign In",
                    tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
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

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
