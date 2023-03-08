import React from "react";
import {
    Actionsheet,
    useDisclose,
    Radio,
    Text,
    Pressable,
    Link,
    Box,
    HStack,
    FormControl,
    Input,
    KeyboardAvoidingView, Button, VStack, useToast
} from "native-base";
import {Keyboard, Platform, StyleSheet} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farEllipsis } from "./icons/regular/farEllipsis";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { CompositeNavigationProp } from "@react-navigation/native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import {farBookmark} from "./icons/regular/farBookmark";
import {farPlus} from "./icons/regular/farPlus";
import {Formik} from "formik";
import {FiltersGateway} from "../gateways/filters_gateway";
import {handleErrors} from "./contacts/ContactsForm";
import * as yup from "yup";
import {CurrencyType} from "@cryptify/common/src/domain/currency_type";
import {AuthContext} from "./contexts/AuthContext";

type Props = {
    setFilters: React.Dispatch<React.SetStateAction<string[]>>;
    setIsUsingSavedFilter: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFilterSaved: React.Dispatch<React.SetStateAction<boolean>>; 
};

export default function SaveFilterActionSheet({ setFilters, setIsUsingSavedFilter, setIsFilterSaved }: Props) {
    const filtersGateway = new FiltersGateway();

    const { token, user } = React.useContext(AuthContext);
    
    const { isOpen, onOpen, onClose } = useDisclose();
    const toast = useToast();
    
    const initialValues = {
        name: "",
    };
    
    async function onSubmit(values: any, formikHelpers: any) {
        try {
            await filtersGateway.createFilter(
                {
                    name: values.name,
                    userId: user.id,
                    currencyType: CurrencyType.ETHEREUM,
                    txnIn: true,
                    txnOut: true,
                    start: "0",
                    end: "0",
                    tagNames: ["tag1", "tag2"],
                    contactNames: [],
                },
                token,
            );
            
            setFilters(["Ethereum in", "Past 90 days"]);

            onClose();
            setIsUsingSavedFilter(true);
            setIsFilterSaved(true);
            toast.show({
                placement: "top",
                duration: 2000,
                render: () => {
                    return (
                        <Box style={styles.toastBox}>
                            <Text size={"footnote1"} fontWeight={"semibold"} color={"white"} style={styles.toastText}>
                                Filter saved
                            </Text>
                        </Box>
                    );
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                formikHelpers.setFieldError("name", error.message);
            }
        } 
    }

    return (
        <>
            <Pressable onPress={onOpen} testID="openSaveFilterActionSheetButton">
                <HStack space={"10px"} alignItems={"center"}>
                    <FontAwesomeIcon icon={farBookmark} size={18} color="#0077E6" />
                    <Text fontWeight={"semibold"} color={"darkBlue.500"}>
                        Save this filter
                    </Text>
                </HStack>
            </Pressable>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <VStack space={"20px"} minWidth={"100%"} paddingX={"15px"} paddingBottom={"15px"}>

                        <Text fontWeight={"semibold"} style={styles.headerStyle} marginX={"auto"}>
                            Save Filter
                        </Text>
                        <Formik initialValues={initialValues} onSubmit={onSubmit}>
                            {({ values, handleChange, errors, touched, submitForm, isSubmitting }) => (
                                <VStack space={"20px"} minWidth={"100%"}>
                                    <FormControl isInvalid={!!(errors.name && touched.name)}>
                                        <Input
                                            value={values.name}
                                            onChangeText={handleChange("name")}
                                            placeholder="Name your filter"
                                            maxLength={60}
                                            keyboardType={"ascii-capable"}
                                            testID="addFilterInput"
                                        />
                                        <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
                                    </FormControl>
                                    <Button
                                        onPress={submitForm}
                                        isDisabled={values.name.length === 0}
                                        testID="saveFilterButton"
                                        width={"100%"}
                                    >
                                        Save filter
                                    </Button>
                                </VStack>   
                            )}
                        </Formik>
                    </VStack>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        paddingTop: 10,
    },
    toastBox: {
        backgroundColor: "#404040",
        borderRadius: 100,
    },
    toastText: {
        paddingHorizontal: 25.5,
        paddingVertical: 10.5,
    },
});
