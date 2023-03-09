import { View } from "../../components/Themed";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { Text, Box, Center, Pressable, HStack } from "native-base";
import { HomeStackScreenProps } from "../../types";
import React from "react";
import { getFiltersByTransactionStrings } from "../../services/filter_service";
import { farBookmark } from "../../components/icons/regular/farBookmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../components/contexts/AuthContext";
import { FiltersGateway } from "../../gateways/filters_gateway";
import { Filter } from "@cryptify/common/src/domain/entities/filter";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { SwipeListView } from "react-native-swipe-list-view";

export default function SavedFiltersScreen({ route, navigation }: HomeStackScreenProps<"SavedFiltersScreen">) {
    const filtersGateway = new FiltersGateway();

    const isFocused = useIsFocused();

    const { token, user } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const [filtersWithHeader, setFiltersWithHeader] = React.useState<FilterWithHeader[]>([]);

    React.useEffect(() => {
        (async () => {
            if (isFocused) {
                const filters = await filtersGateway.findAllFilters(
                    {
                        id: user.id,
                        currencyType: route.params.currencyType,
                    },
                    token,
                );

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
                setIsLoading(false);
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

    function renderItem(rowData: ListRenderItemInfo<FilterWithHeader>) {
        return (
            <>
                {rowData.item.header ? (
                    <Box background={"text.100"}>
                        <Text
                            color={"text.500"}
                            fontWeight={"semibold"}
                            style={{ paddingHorizontal: 15, paddingVertical: 5 }}
                        >
                            {rowData.item.filter.name}
                        </Text>
                    </Box>
                ) : (
                    <Pressable
                        onPress={() => onSubmit(rowData.item.filter)}
                        background={"white"}
                        _pressed={{ background: "text.200" }}
                        testID="contactListItem"
                        height={"46px"}
                    >
                        <HStack height={"100%"}>
                            <Text style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                                {rowData.item.filter.name}
                            </Text>
                        </HStack>
                    </Pressable>
                )}
            </>
        );
    }

    function renderHiddenItem(rowData: ListRenderItemInfo<FilterWithHeader>) {
        return (
            !rowData.item.header && (
                <Pressable
                    onPress={async () => {
                        try {
                            await filtersGateway.deleteFilter(
                                {
                                    id: user.id,
                                    name: rowData.item.filter.name,
                                    currencyType: route.params.currencyType,
                                },
                                token,
                            );

                            const arr = [...filtersWithHeader];
                            const index = filtersWithHeader.findIndex(
                                (item) => item.filter.name === rowData.item.filter.name,
                            );
                            arr.splice(index, 1);
                            setFiltersWithHeader(arr);
                        } catch (e) {}
                    }}
                    style={[styles.deleteButton]}
                    backgroundColor={"red.500"}
                    height={"46px"}
                >
                    <Text color={"white"}>Delete</Text>
                </Pressable>
            )
        );
    }

    if (isLoading) {
        return;
    }

    return (
        <View style={styles.view}>
            {filtersWithHeader.length === 0 ? (
                <Center alignItems="center" marginY="auto">
                    <Box marginTop="-10px"></Box>
                    <FontAwesomeIcon icon={farBookmark} style={styles.emptyIcon} size={56} color={"#404040"} />
                    <Text style={styles.emptyText}>
                        You do not have any saved filters{"\n"}for {titleCase(route.params.currencyType)} wallets.
                    </Text>
                </Center>
            ) : (
                <SwipeListView
                    data={filtersWithHeader}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-74}
                    disableRightSwipe={true}
                    previewRowKey={"0"}
                    friction={100}
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
    deleteButton: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 0,
        width: 74,
    },
});
