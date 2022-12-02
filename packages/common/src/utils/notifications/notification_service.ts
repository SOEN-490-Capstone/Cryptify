import { AbstractServiceGateway } from "@cryptify/common/src/utils/gateway/abstract_service_gateway";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { GetTransactionsRequest } from "@cryptify/common/src/requests/get_transaction_request";
import { DeleteWalletRequest } from "@cryptify/common/src/requests/delete_wallet_request";
import {CurrencyType} from "@cryptify/common/src/domain/currency_type";

export interface NotificationService {
    sendTransactionNotifications(transactions: Transaction[], currencyType: CurrencyType): Promise<void>;
}

export interface Notification {
    to: string;
    title: string;
    body: string;
}
