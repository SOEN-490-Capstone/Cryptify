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
import { Pressable, Text } from "native-base";
import { farXMark } from "../components/icons/regular/farXMark";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { RouteProp } from "@react-navigation/core/src/types";
import { farPlus } from "../components/icons/regular/farPlus";
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
import AddTagsScreen from "../screens/AddTagsScreen";
import FilterScreen from "../screens/FilterScreen";
import EditTagScreen from "../screens/EditTagScreen";
import TransactionTagsScreen from "../screens/TransactionTagsScreen";
import AddTransactionTagsScreen from "../screens/AddTransactionTagsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SignUpNotificationsScreen from "../screens/SignUpNotificationsScreen";
import useTabBar from "../hooks/useTabBar";
import ContactsListScreen from "../screens/contacts/ContactsListScreen";
import AddContactScreen from "../screens/contacts/AddContactScreen";
import BackButton from "../components/BackButton";
import ReportSelectionScreen from "../screens/reports/ReportSelectionScreen";
import TransactionHistoryReportScreen from "../screens/reports/TransactionHistoryReportScreen";
import AccountScreen from "../screens/account/AccountScreen";
import AccountTypeScreen from "../screens/account/AccountTypeScreen";
import EditContactScreen from "../screens/contacts/EditContactScreen";
import ContactOverviewScreen from "../screens/contacts/ContactOverviewScreen";

// TODO refactor this file to reduce code duplication and see if
// there is a way to centralize some of the styling between
// navigation stacks

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackScreen({ navigation, route }: { route: RouteProp<any, any>; navigation: any }) {
    useTabBar({ navigation, route, initialScreenName: "HomeScreen" });

    return (
        <HomeStack.Navigator
            screenOptions={({ navigation }) => ({
                headerLeft: () => BackButton(navigation),
            })}
        >
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
                    headerLeft: () => null,
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
                name="TransactionTagsScreen"
                component={TransactionTagsScreen}
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
            <HomeStack.Screen
                name="AddTransactionTagsScreen"
                component={AddTransactionTagsScreen}
                options={{
                    headerTintColor: "#404040",
                    title: "",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
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
                options={{
                    title: "Transactions",
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
                    headerRight: () => <AddressShareButton wallet={route.params.wallet} />,
                })}
            />
            <HomeStack.Screen
                name="ReportSelectionScreen"
                component={ReportSelectionScreen}
                options={{
                    headerTintColor: "#404040",
                    title: "Documents",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
            />
            <HomeStack.Screen
                name="TransactionHistoryReportScreen"
                component={TransactionHistoryReportScreen}
                options={{
                    headerTintColor: "#404040",
                    title: "Transaction History",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
            />
            <HomeStack.Screen
                name="ContactsListScreen"
                component={ContactsListScreen}
                options={({ route }) => ({
                    title: "Contacts",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <Pressable
                            onPress={() =>
                                // Prefilled add contact
                                navigation.navigate("AddContactScreen", {
                                    prefilledWalletAddress: route.params.prefilledWalletAddress,
                                })
                            }
                            testID="createContactButton"
                        >
                            <FontAwesomeIcon icon={farPlus} color="#404040" size={22} />
                        </Pressable>
                    ),
                })}
            />
            <HomeStack.Screen
                name="AddContactScreen"
                component={AddContactScreen}
                options={{
                    title: "Add a Contact",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
            />
        </HomeStack.Navigator>
    );
}

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsStackScreen({ navigation, route }: { route: RouteProp<any, any>; navigation: any }) {
    useTabBar({ navigation, route, initialScreenName: "SettingsScreen" });

    return (
        <SettingsStack.Navigator
            screenOptions={({ navigation }) => ({
                headerLeft: () => BackButton(navigation),
            })}
        >
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
                    headerLeft: () => null,
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
                name="ContactsListScreen"
                component={ContactsListScreen}
                options={{
                    title: "Contacts",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <Pressable
                            onPress={() =>
                                // Regular add contact
                                navigation.navigate("AddContactScreen")
                            }
                            testID="createContactButton"
                        >
                            <FontAwesomeIcon icon={farPlus} color="#404040" size={22} />
                        </Pressable>
                    ),
                }}
            />
            <SettingsStack.Screen
                name="AddContactScreen"
                component={AddContactScreen}
                options={{
                    title: "Add a Contact",
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
                name="EditContactScreen"
                component={EditContactScreen}
                options={{
                    title: "Edit a Contact",
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
                name="ContactOverviewScreen"
                component={ContactOverviewScreen}
                options={({ route }) => ({
                    title: "",
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
                name="AddTagsScreen"
                component={AddTagsScreen}
                options={{
                    title: "",
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
                name="EditTagScreen"
                component={EditTagScreen}
                options={{
                    title: "",
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
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    title: "Notifications",
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
                name="AccountScreen"
                component={AccountScreen}
                options={{
                    title: "Account",
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
                name="AccountTypeScreen"
                component={AccountTypeScreen}
                options={{
                    title: "",
                    headerTintColor: "#404040",
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: "600",
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                }}
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
                options={({ navigation }) => ({
                    title: "",
                    headerTintColor: "#404040",
                    headerShadowVisible: false,
                    headerLeft: () => BackButton(navigation),
                })}
            />
            <GuestStack.Screen
                name="SignUpNotificationsScreen"
                component={SignUpNotificationsScreen}
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
