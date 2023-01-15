import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import {
    NotificationStrategy,
    NotificationStrategyFactory,
} from "@cryptify/common/src/utils/notifications/notification_strategy_factory";
import { User } from "@cryptify/common/src/domain/entities/user";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";

@Injectable()
export class ReportNotificationService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly notificationStrategyFactory: NotificationStrategyFactory,
    ) {}

    async sendReportNotification(userId: number, wallet: Wallet, fileName: string, csv: string): Promise<void> {
        const { firstName, email } = await this.usersRepository.findOneBy({ id: userId });

        const title = `Your ${wallet.name} Transaction History document is ready`;
        const body = `Hi ${firstName},\nYour transaction history document for <b>${wallet.name}</b> has been generated and attached in this email.`;

        await this.notificationStrategyFactory.get(NotificationStrategy.EMAIL).sendNotification({
            to: email,
            title,
            body,
            attachment: {
                filename: fileName,
                content: csv,
            },
        });
    }
}
