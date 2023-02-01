import { CompositeNavigationProp } from "@react-navigation/native";
import { TransactionDetails } from "./TransactionDetails";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import React from "react";
import SingleLineListItem from "../list/SingleLineListItem";
import MultiLineListItem from "../list/MultiLineListItem";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { AuthContext } from "../contexts/AuthContext";
import { isPro } from "@cryptify/common/src/domain/role";

type Props = {
    transaction: Transaction;
    wallet: WalletWithBalance;
    navigation: CompositeNavigationProp<any, any>;
};

export function EthereumTransactionDetails({ transaction, wallet, navigation }: Props) {
    const { user } = React.useContext(AuthContext);

    // TODO
    // Add block number, position in block and nonce
    // Get Gas Limit
    // Get Gas Price
    const otherDetails = isPro(user) && (
        <>
            <SingleLineListItem label={"Block Number"} value={"15"} />
            <SingleLineListItem label={"Position in Block"} value={"19"} />
            <SingleLineListItem label={"Nonce"} value={"109,764"} />
            <SingleLineListItem label={"Gas Limit (Units)"} value={"100,000"} />
            <MultiLineListItem label={"Gas Price"} value={"0.0000000000012323 ETH"} />
        </>
    );

    return <TransactionDetails txn={transaction} wallet={wallet} navigation={navigation} otherDetails={otherDetails} />;
}
