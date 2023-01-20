import { TransactionDetails } from "./TransactionDetails";
import React from "react";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { CompositeNavigationProp } from "@react-navigation/native";
import SingleLineListItem from "../list/SingleLineListItem";

type Props = {
    transaction: Transaction;
    walletAddress: string;
    navigation: CompositeNavigationProp<any, any>;
};

export function BitcoinTransactionDetails({ transaction, walletAddress, navigation }: Props) {
    // TODO
    // Add block number, confirmations
    const otherDetails = (
        <>
            <SingleLineListItem label={"Block Number"} value={"762,746"} />
            <SingleLineListItem label={"Confirmations"} value={"52"} />
        </>
    );

    return (
        <TransactionDetails
            txn={transaction}
            walletAddress={walletAddress}
            navigation={navigation}
            otherDetails={otherDetails}
        />
    );
}
