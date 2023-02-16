import React from "react";
import { HomeStackScreenProps, SettingsStackScreenProps } from "../../types";
import { View } from "../../components/Themed";
import { FieldArray, Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import { Button, FormControl, HStack, Input, ScrollView, Text } from "native-base";
import Collapsible from "react-native-collapsible";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBitcoin } from "../../components/icons/brands/faBitcoin";
import { farChevronUp } from "../../components/icons/regular/farChevronUp";
import { farChevronDown } from "../../components/icons/regular/farChevronDown";
import { falCircleXMark } from "../../components/icons/light/falCircleXMark";
import { fasCirclePlusSolid } from "../../components/icons/solid/fasCirclePlusSolid";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { faEthereum } from "../../components/icons/brands/faEthereum";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { getCurrencyType, isValidCurrencyAddress } from "@cryptify/common/src/utils/currency_utils";
import { ERROR_WALLET_ADDRESS_INVALID_FOR_CURRENCY } from "@cryptify/common/src/errors/error_messages";
import { ContactsGateway } from "../../gateways/contacts_gateway";
import { AuthContext } from "../../components/contexts/AuthContext";
import { CompositeScreenProps } from "@react-navigation/native";
import {CreateContactRequest} from "@cryptify/common/src/requests/create_contact_request";
import ContactsForm from "../../components/contacts/ContactsForm";

export default function EditContactScreen(props: SettingsStackScreenProps<"EditContactScreen">) {
    return (
        <View style={styles.view}>
            <ContactsForm
                prefilledWalletAddress={undefined}
                contact={props.route.params.contact}
                navigation={props.navigation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 15,
    },
});
