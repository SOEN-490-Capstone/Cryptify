/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace ReactNavigation {
        type RootParamList = RootStackParamList;
    }
}

export type HomeStackParamList = {
    HomeScreen: undefined;
    AddWalletScreen: undefined;
    AddWalletFormScreen: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<HomeStackParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
        >;

export type SettingsStackParamList = {
    SettingsScreen: undefined;
    ViewWalletsScreen: undefined;
    AddWalletScreen: undefined;
};

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<SettingsStackParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
        >;

export type RootTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList> | undefined;
    SettingsStack: NavigatorScreenParams<SettingsStackParamList> | undefined;
    SignUpScreen: undefined;
    SignInScreen: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
    >;

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;

