import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { typeToISOCode } from "@cryptify/common/src/utils/currency_utils";
import { formatAddress } from "@cryptify/common/src/utils/address_utils";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import {
    NotificationStrategy,
    NotificationStrategyFactory,
} from "@cryptify/common/src/utils/notifications/notification_strategy_factory";

@Injectable()
export class TransactionNotificationService {
    private static readonly keys = ["walletOut", "walletIn"] as const;

    constructor(
        @InjectRepository(Wallet) private readonly walletsRepository: Repository<Wallet>,
        private readonly notificationStrategyFactory: NotificationStrategyFactory,
    ) {}

    async sendTransactionNotifications(transactions: Transaction[], currencyType: CurrencyType): Promise<void> {
        await Promise.all(
            transactions.map(async (transaction) => {
                TransactionNotificationService.keys.map(async (key) => {
                    const wallets = await this.walletsRepository.find({
                        where: { address: transaction[key] },
                        relations: { user: true },
                    });

                    await Promise.all(
                        wallets.map(async (wallet) => {
                            if (!wallet.user.areNotificationsEnabled) {
                                return;
                            }
                            // After all the processing is done to build the standard transaction notification we then
                            // delegate the actual sending of the notification to a concrete implementation. This allows us
                            // to centralize all the pre-processing and formatting in a single place while allowing for a
                            // module notification system
                            await this.notificationStrategyFactory.get(NotificationStrategy.EMAIL).sendNotification({
                                to: wallet.user.email,
                                title: this.getTitle(key, currencyType),
                                body: this.getBody(key, wallet, transaction, currencyType),
                            });
                        })
                    );
                });
            }),
        );
    }

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
