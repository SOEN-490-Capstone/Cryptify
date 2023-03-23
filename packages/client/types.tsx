/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { User } from "@cryptify/common/src/domain/entities/user";
import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { Contact } from "@cryptify/common/src/domain/entities/contact";
import React from "react";
import { FormikHelpers } from "formik/dist/types";

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
    wallet: WalletWithBalance;
};

type TransactionTagsScreenProps = {
    transaction: Transaction;
    setTransaction: React.Dispatch<React.SetStateAction<Transaction>>;
};

type AddTransactionTagsScreenProps = {
    transaction: Transaction;
    setTransaction: React.Dispatch<React.SetStateAction<Transaction>>;
    transactionTags: Tag[];
    setTransactionTags: React.Dispatch<React.SetStateAction<Tag[]>>;
    transactionTagsNotAdded: Tag[];
    setTransactionTagsNotAdded: React.Dispatch<React.SetStateAction<Tag[]>>;
};

type WalletOverviewScreenProps = {
    title: string;
    wallet: WalletWithBalance;
};

type WalletDetailsScreenProps = {
    wallet: WalletWithBalance;
    transactions: Transaction[];
};

type WalletQRCodeProps = {
    wallet: WalletWithBalance;
};

type TransactionsListScreenProps = {
    transactions: Transaction[];
    wallet: WalletWithBalance;
    displaySeparation: boolean;
};

// TODO: find a way to dynamically get the first element of stack instead of carrying a boolean
type ViewWalletsScreenProps = {
    isSettingsTab: boolean;
};

type WalletSettingsScreenProps = {
    title: string;
    wallet: WalletWithBalance;
};

type FilterScreenProps = {
    filters: string[];
    setFilters: React.Dispatch<React.SetStateAction<string[]>>;
    wallet: WalletWithBalance;
    isUsingSavedFilter: boolean;
    setIsUsingSavedFilter: React.Dispatch<React.SetStateAction<boolean>>;
    contactFilters: string[];
    setContactFilters: React.Dispatch<React.SetStateAction<string[]>>;
    tagFilters: string[];
    setTagFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

type FilterContactScreenProps = {
    filters: string[];
    setFilters: React.Dispatch<React.SetStateAction<string[]>>;
    contactFilters: string[];
    setContactFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

type FilterTagScreenProps = {
    filters: string[];
    setFilters: React.Dispatch<React.SetStateAction<string[]>>;
    tagFilters: string[];
    setTagFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

type SavedFiltersScreenProps = {
    currencyType: CurrencyType;
    setFilters: React.Dispatch<React.SetStateAction<string[]>>;
    setFilterByTransaction: React.Dispatch<React.SetStateAction<string>>;
    setFilterByDate: React.Dispatch<React.SetStateAction<string>>;
    setIsUsingSavedFilter: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFilterSaved: React.Dispatch<React.SetStateAction<boolean>>;
};

type EditTagScreenProps = {
    tag: Tag;
};

type SignUpNotificationsScreenProps = {
    user: User;
    token: JwtToken;
};

type ReportSelectionScreenProps = {
    wallet: WalletWithBalance;
};

type TransactionHistoryReportScreenProps = {
    wallet: WalletWithBalance;
};

type ContactListScreenProps = {
    prefilledWalletAddress?: string;
};

type AddContactScreenProps = {
    prefilledWalletAddress?: string;
};

type QRCodeScannerScreenProps = {
    fieldKey: string;
    setFieldValue: FormikHelpers<any>["setFieldValue"];
    currencyType: CurrencyType;
};

export type HomeStackParamList = {
    HomeScreen: undefined;
    AddWalletSelectionScreen: undefined;
    AddWalletScreen: AddWalletScreenProps;
    TransactionDetailsScreen: TransactionDetailsProps;
    WalletOverviewScreen: WalletOverviewScreenProps;
    WalletDetailsScreen: WalletDetailsScreenProps;
    TransactionsListScreen: TransactionsListScreenProps;
    WalletQRCodeScreen: WalletQRCodeProps;
    FilterScreen: FilterScreenProps;
    FilterContactScreen: FilterContactScreenProps;
    FilterTagScreen: FilterTagScreenProps;
    SavedFiltersScreen: SavedFiltersScreenProps;
    TransactionTagsScreen: TransactionTagsScreenProps;
    AddTransactionTagsScreen: AddTransactionTagsScreenProps;
    ReportSelectionScreen: ReportSelectionScreenProps;
    TransactionHistoryReportScreen: TransactionHistoryReportScreenProps;
    ContactsListScreen: ContactListScreenProps;
    AddContactScreen: AddContactScreenProps;
    QRCodeScannerScreen: QRCodeScannerScreenProps;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
    BottomTabScreenProps<HomeStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

type ContactOverviewScreenProps = {
    contact: Contact;
};

type EditContactScreenProps = {
    contact: Contact;
    setContact: React.Dispatch<React.SetStateAction<Contact>>;
};

export type SettingsStackParamList = {
    SettingsScreen: undefined;
    AddWalletSelectionScreen: undefined;
    AddWalletScreen: AddWalletScreenProps;
    ViewWalletsScreen: ViewWalletsScreenProps;
    WalletSettingsScreen: WalletSettingsScreenProps;
    ContactsListScreen: ContactListScreenProps;
    AddContactScreen: AddContactScreenProps;
    EditContactScreen: EditContactScreenProps;
    ContactOverviewScreen: ContactOverviewScreenProps;
    TagsSettingsScreen: undefined;
    EditTagScreen: EditTagScreenProps;
    AddTagsScreen: undefined;
    NotificationsScreen: undefined;
    AccountScreen: undefined;
    AccountNameScreen: undefined;
    AccountEmailScreen: undefined;
    AccountPasswordScreen: undefined;
    AccountTypeScreen: undefined;
    QRCodeScannerScreen: QRCodeScannerScreenProps;
};

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> = CompositeScreenProps<
    BottomTabScreenProps<SettingsStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

export type GuestStackParamList = {
    WelcomeScreen: undefined;
    SignUpScreen: undefined;
    SignInScreen: undefined;
    SignUpNotificationsScreen: SignUpNotificationsScreenProps;
    ResetPasswordEmailScreen: undefined;
    CreateNewPasswordScreen: CreateNewPasswordScreenProps;
    ResetPasswordSuccessScreen: undefined;
    ResetPasswordFailureScreen: undefined;
};

export type CreateNewPasswordScreenProps = {
    token: string;
}

export type LinkStackParamList = {
    SignInScreen: undefined;
    CreateNewPasswordScreen: CreateNewPasswordScreenProps;
}

export type GuestStackScreenProps<T extends keyof GuestStackParamList> = CompositeScreenProps<
    BottomTabScreenProps<GuestStackParamList & LinkStackParamList, T>,
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
    Link: NavigatorScreenParams<LinkStackParamList> | undefined;
    NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;
