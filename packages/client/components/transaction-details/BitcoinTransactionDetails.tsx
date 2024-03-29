import { TransactionDetails } from "./TransactionDetails";
import React from "react";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { CompositeNavigationProp } from "@react-navigation/native";
import SingleLineListItem from "../list/SingleLineListItem";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { isPro } from "@cryptify/common/src/domain/role";
import { AuthContext } from "../contexts/AuthContext";

type Props = {
    transaction: Transaction;
    wallet: WalletWithBalance;
    navigation: CompositeNavigationProp<any, any>;
};

export function BitcoinTransactionDetails({ transaction, wallet, navigation }: Props) {
    const { user } = React.useContext(AuthContext);

    // TODO
    // Add block number, confirmations
    const otherDetails = isPro(user) && (
        <>
            <SingleLineListItem label={"Block Number"} value={"762,746"} />
            <SingleLineListItem label={"Confirmations"} value={"52"} />
        </>
    );

    return <TransactionDetails txn={transaction} wallet={wallet} navigation={navigation} otherDetails={otherDetails} />;
}
