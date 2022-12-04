import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { typeToISOCode } from "@cryptify/common/src/utils/currency_utils";
import { formatAddress } from "@cryptify/common/src/utils/address_utils";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { Repository } from "typeorm";

export abstract class AbstractNotificationServiceTemplateMethod {
    private static readonly keys = ["walletOut", "walletIn"] as const;

    protected constructor(private readonly walletsRepository: Repository<Wallet>) {}

    async sendTransactionNotifications(transactions: Transaction[], currencyType: CurrencyType): Promise<void> {
        await Promise.all(
            transactions.map(async (transaction) => {
                AbstractNotificationServiceTemplateMethod.keys.map(async (key) => {
                    const wallets = await this.walletsRepository.find({
                        where: { address: transaction[key] },
                        relations: { user: true },
                    });

                    wallets.map(async (wallet) => {
                        // After all the processing is done to build the standard transaction notification we then
                        // delegate the actual sending of the notification to a concrete implementation using the
                        // template method design pattern. This allows us to centralize all the pre-processing and
                        // formatting in a single place while allowing for a module notification system. This can be
                        // easily expanded to support sms and push notifications by simply extending this abstract
                        // class and implementing only the specific functionality to send out a single notification
                        // for that platform
                        await this.sendNotification({
                            to: wallet.user.email,
                            title: this.getTitle(key, currencyType),
                            body: this.getBody(key, wallet, transaction, currencyType),
                        });
                    });
                });
            }),
        );
    }

    protected abstract sendNotification(notification: Notification): Promise<void>;

    private getBody(
        key: "walletOut" | "walletIn",
        wallet: Wallet,
        transaction: Transaction,
        currencyType: CurrencyType,
    ): string {
        const amount = `${transaction.amount} ${typeToISOCode[currencyType]}`;
        switch (key) {
            case "walletIn":
                return `You received ${amount} from ${formatAddress(transaction.walletOut)} to ${wallet.name}`;
            case "walletOut":
                return `You sent ${amount} to ${formatAddress(transaction.walletIn)} from ${wallet.name}`;
        }
    }

    private getTitle(key: "walletOut" | "walletIn", currencyType: CurrencyType): string {
        switch (key) {
            case "walletIn":
                return `${titleCase(currencyType)} Received`;
            case "walletOut":
                return `${titleCase(currencyType)} Sent`;
        }
    }
}

export interface Notification {
    to: string;
    title: string;
    body: string;
}
