import { View } from "../../components/Themed";
import {FlatList, StyleSheet} from "react-native";
import {Text, Radio, Box, Button, HStack, Link, Center, Pressable} from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import DateBox from "../../components/DateBox";
import { getFiltersByDateStrings, getFiltersByTransactionStrings } from "../../services/filter_service";
import { farBookmark } from "../../components/icons/regular/farBookmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SaveFilterActionSheet from "../../components/SaveFilterActionSheet";
import { fasBookmark } from "../../components/icons/solid/fasBookmark";
import {ContactsGateway} from "../../gateways/contacts_gateway";
import {useIsFocused} from "@react-navigation/native";
import {AuthContext} from "../../components/contexts/AuthContext";
import {Contact} from "@cryptify/common/src/domain/entities/contact";
import {falAddressBook} from "../../components/icons/light/falAddressBook";
import {FiltersGateway} from "../../gateways/filters_gateway";
import {Filter} from "@cryptify/common/src/domain/entities/filter";
import {titleCase} from "@cryptify/common/src/utils/string_utils";

export default function SavedFiltersScreen({ route, navigation }: HomeStackScreenProps<"SavedFiltersScreen">) {
    const filtersGateway = new FiltersGateway();

    const isFocused = useIsFocused();

    const { token, user } = React.useContext(AuthContext);
    const [filtersWithHeader, setFiltersWithHeader] = React.useState<FilterWithHeader[]>([]);

    React.useEffect(() => {
        (async () => {
            if (isFocused) {
                const filters = await filtersGateway.findAllFilters({
                    id: user.id,
                    currencyType: route.params.currencyType
                }, token);


                let currChar = "";
                const listData = filters.flatMap((filter) => {
                    if (filter.name.charAt(0).toUpperCase() !== currChar) {
                        currChar = filter.name.charAt(0).toUpperCase();
                        return [
                            {
                                filter: {
                                    ...filter,
                                    name: currChar,
                                },
                                header: true,
                            },
                            { filter, header: false },
                        ];
                    } else {
                        return [{ filter, header: false }];
                    }
                });

                setFiltersWithHeader(listData);
            }
        })();
    }, [isFocused]);

    async function onSubmit(filter: Filter) {
        const filters: string[] = [];
        const filtersByTransaction = getFiltersByTransactionStrings(route.params.currencyType);
        if (filter.txnOut && filter.txnIn) {
            filters[0] = filtersByTransaction[0];
        } else if (!filter.txnOut && filter.txnIn) {
            filters[0] = filtersByTransaction[1];
        } else if (filter.txnOut && !filter.txnIn) {
            filters[0] = filtersByTransaction[2];
        }

        filters[1] = filter.range;
        
        route.params.setFilters(filters);
        route.params.setFilterByTransaction(filters[0]);
        route.params.setFilterByDate(filters[1]);
        route.params.setIsFilterSaved(true);
        route.params.setIsUsingSavedFilter(true);
        navigation.goBack();
    }

    // TODO use a more efficient way of getting these indicies
    const stickyHeaderIndices = filtersWithHeader.flatMap((obj) =>
        obj.header ? [filtersWithHeader.indexOf(obj)] : [],
    );

    return (
        <View style={styles.view}>
            {filtersWithHeader.length === 0 ? (
                <Center alignItems="center" marginY="auto">
                    <Box marginTop="-10px"></Box>
                    <FontAwesomeIcon icon={farBookmark} style={styles.emptyIcon} size={56} color={"#404040"} />
                    <Text style={styles.emptyText}>You do not have any saved filters{'\n'}for {titleCase(route.params.currencyType)} wallets.</Text>
                </Center>
            ) : (
                <FlatList
                    data={filtersWithHeader}
                    renderItem={({ item }) => (
                        <>
                            {item.header ? (
                                <Box background={"text.100"}>
                                    <Text
                                        color={"text.500"}
                                        fontWeight={"semibold"}
                                        style={{ paddingHorizontal: 15, paddingVertical: 5 }}
                                    >
                                        {item.filter.name}
                                    </Text>
                                </Box>
                            ) : (
                                <Pressable
                                    onPress={() => onSubmit(item.filter)}
                                    _pressed={{ background: "text.200" }}
                                    testID="contactListItem"
                                >
                                    <Text style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                                        {item.filter.name}
                                    </Text>
                                </Pressable>
                            )}
                        </>
                    )}
                    stickyHeaderIndices={stickyHeaderIndices}
                />
            )}
        </View>
    );
}

type FilterWithHeader = {
    filter: Filter;
    header: boolean;
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    emptyIcon: {
        alignItems: "center",
    },
    emptyText: {
        textAlign: "center",
        maxWidth: 265,
        marginTop: 15,
    },
});
