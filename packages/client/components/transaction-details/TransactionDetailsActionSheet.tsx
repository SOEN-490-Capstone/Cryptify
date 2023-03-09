import React from "react";
import { Actionsheet, useDisclose, Radio, Text, Pressable, Link, Box } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { farEllipsis } from "../icons/regular/farEllipsis";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { CompositeNavigationProp } from "@react-navigation/native";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

type Props = {
    wallet: WalletWithBalance;
    transaction: Transaction;
    navigation: CompositeNavigationProp<any, any>;
};

export default function TransactionDetailsActionSheet({ wallet, navigation, transaction }: Props) {
    const isIncomingTransaction = wallet.address == transaction.walletIn;

    const { isOpen, onOpen, onClose } = useDisclose();
    return (
        <>
            <Pressable onPress={onOpen} style={{ paddingRight: 4.5 }} testID="transactionOptionsButton">
                <FontAwesomeIcon icon={farEllipsis} size={22} />
            </Pressable>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Text fontWeight={"semibold"} style={styles.headerStyle} marginX={"auto"}>
                        Options
                    </Text>
                    <Radio.Group
                        name="transactionOptions"
                        accessibilityLabel="transactionOptions"
                        onChange={() => onClose()}
                    >
                        <Actionsheet.Item>
                            <Link
                                style={styles.option}
                                isUnderlined={false}
                                _text={{
                                    color: "darkBlue.500",
                                    fontWeight: "semibold",
                                }}
                                onPress={() =>
                                    navigation.navigate("ContactsListScreen", {
                                        prefilledWalletAddress: isIncomingTransaction
                                            ? transaction.walletOut
                                            : transaction.walletIn,
                                    })
                                }
                                testID="addContactActionSheetButton"
                            >
                                {isIncomingTransaction ? "Add sender contact" : "Add recipient contact"}
                            </Link>
                        </Actionsheet.Item>
                    </Radio.Group>
                    <Box paddingBottom={"15px"}></Box>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        paddingTop: 12.5,
        paddingBottom: 10,
    },
    option: {
        marginHorizontal: 15,
    },
});
