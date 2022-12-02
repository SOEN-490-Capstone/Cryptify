import { NotificationService } from "@cryptify/common/src/utils/notifications/notification_service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer from "nodemailer";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { titleCase } from "@cryptify/common/src/utils/string_utils";
import { typeToISOCode } from "@cryptify/common/src/utils/currency_utils";
import { formatAddress } from "@cryptify/common/src/utils/address_utils";

@Injectable()
export class EmailNotificationService implements NotificationService {
    private readonly transporter: nodemailer.Transporter;

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Wallet)
        private readonly walletsRepository: Repository<Wallet>,
    ) {
        this.transporter = nodemailer.createTransport({
            host: configService.get<string>("NODEMAILER_HOST"),
            port: +configService.get<number>("NODEMAILER_PORT"),
            auth: {
                user: configService.get<string>("NODEMAILER_USERNAME"),
                pass: configService.get<string>("NODEMAILER_PASSWORD"),
            },
        });
    }

    async sendTransactionNotifications(transactions: Transaction[], currencyType: CurrencyType): Promise<void> {
        await Promise.all(
            transactions.map(async (transaction) => {
                const keys = ["walletOut", "walletIn"] as const;
                keys.map(async (key) => {
                    const wallets = await this.walletsRepository.find({
                        where: { address: transaction[key] },
                        relations: { user: true },
                    });

                    const subject =
                        key === "walletOut" ? `${titleCase(currencyType)} Sent` : `${titleCase(currencyType)} Received`;
                    wallets.map(async (wallet) => {
                        const text =
                            key === "walletOut"
                                ? `You sent ${transaction.amount} ${typeToISOCode[currencyType]} to ${formatAddress(
                                      transaction.walletIn,
                                  )} from ${wallet.name}`
                                : `You received ${transaction.amount} ${
                                      typeToISOCode[currencyType]
                                  } from ${formatAddress(transaction.walletOut)} to ${wallet.name}`;

                        this.transporter.sendMail({
                            from: "noreply@cryptify.com",
                            to: wallet.user.email,
                            subject,
                            text,
                        });
                    });
                });
            }),
        );
    }
}
