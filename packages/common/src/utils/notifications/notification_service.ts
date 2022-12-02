import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";

export interface NotificationService {
    sendTransactionNotifications(transactions: Transaction[], currencyType: CurrencyType): Promise<void>;
}

export interface Notification {
    to: string;
    title: string;
    body: string;
}
