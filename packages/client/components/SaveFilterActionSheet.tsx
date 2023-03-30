import React from "react";
import {
    Actionsheet,
    useDisclose,
    Text,
    Pressable,
    Box,
    HStack,
    FormControl,
    Input,
    Button,
    VStack,
    useToast,
} from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farBookmark } from "./icons/regular/farBookmark";
import { Formik } from "formik";
import { FiltersGateway } from "../gateways/filters_gateway";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { AuthContext } from "./contexts/AuthContext";
import { useKeyboardBottomInset } from "../hooks/useKeyboardBottomInset";
import { getFiltersByDateStrings } from "../services/filter_service";

type Props = {
    setFilters: React.Dispatch<React.SetStateAction<string[]>>;
    filterByTransaction: string;
    filterByDate: string;
    currencyType: CurrencyType;
    setIsUsingSavedFilter: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFilterSaved: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SaveFilterActionSheet({
    setFilters,
    setIsUsingSavedFilter,
    setIsFilterSaved,
    filterByTransaction,
    filterByDate,
    currencyType,
}: Props) {
    const filtersGateway = new FiltersGateway();

    const { token, user } = React.useContext(AuthContext);

    const { isOpen, onOpen, onClose } = useDisclose();
    const bottomInset = useKeyboardBottomInset();
    const toast = useToast();

    const initialValues = {
        name: "",
    };

    const filtersByDate = getFiltersByDateStrings();

    async function onSubmit(values: any, formikHelpers: any) {
        try {
            const filters = [filterByTransaction];

            // If a custom date is selected, but at least one of the from or to dates are not selected,
            // then filterByDate value will be "Custom Dates" and not the date range. In this scenario,
            // use the default date filter value.
            if (filterByDate === "Custom Dates") {
                filters.push(filtersByDate[0]);
            } else {
                filters.push(filterByDate);
            }

            setFilters(filters);

            const req = {
                name: values.name,
                userId: user.id,
                currencyType,
                txnIn: true,
                txnOut: true,
                range: filters[1],
                tagNames: [],
                contactNames: [],
            };
            if (filterByTransaction.endsWith("in")) {
                req.txnIn = true;
                req.txnOut = false;
            }
            if (filterByTransaction.endsWith("out")) {
                req.txnIn = false;
                req.txnOut = true;
            }
            await filtersGateway.createFilter(req, token);

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
                <Actionsheet.Content bottom={bottomInset}>
                    <VStack space={"20px"} minWidth={"100%"} paddingX={"15px"} paddingBottom={"15px"}>
                        <Text fontWeight={"semibold"} style={styles.headerStyle} marginX={"auto"}>
                            Save Filter
                        </Text>
                        <Formik initialValues={initialValues} onSubmit={onSubmit}>
                            {({ values, handleChange, errors, touched, submitForm }) => (
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
