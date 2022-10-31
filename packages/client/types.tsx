/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace ReactNavigation {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        type RootParamList = RootStackParamList;
    }
}

type AddWalletScreenProps = {
    currencyType: CurrencyType;
};

type TransactionDetailsProps = {
    title: string;
    transaction: Transaction;
    walletAddress: string;
};

export type HomeStackParamList = {
    HomeScreen: undefined;
    AddWalletSelectionScreen: undefined;
    AddWalletScreen: AddWalletScreenProps;
    TransactionDetailsScreen: TransactionDetailsProps;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
    BottomTabScreenProps<HomeStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

export type SettingsStackParamList = {
    SettingsScreen: undefined;
    ViewWalletsScreen: undefined;
    AddWalletSelectionScreen: undefined;
    AddWalletScreen: AddWalletScreenProps;
    TransactionDetailsScreen: {
        title: string;
        transaction: Transaction;
        walletAddress: string;
    };
};

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> = CompositeScreenProps<
    BottomTabScreenProps<SettingsStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

export type GuestStackParamList = {
    WelcomeScreen: undefined;
    SignUpScreen: undefined;
    SignInScreen: undefined;
};

export type GuestStackScreenProps<T extends keyof GuestStackParamList> = CompositeScreenProps<
    BottomTabScreenProps<GuestStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

export type RootTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList> | undefined;
    SettingsStack: NavigatorScreenParams<SettingsStackParamList> | undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;

export type RootStackParamList = {
    Guest: NavigatorScreenParams<GuestStackParamList> | undefined;
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;
