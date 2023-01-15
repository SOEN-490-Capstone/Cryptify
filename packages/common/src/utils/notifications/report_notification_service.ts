import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import {
    NotificationStrategy,
    NotificationStrategyFactory,
} from "@cryptify/common/src/utils/notifications/notification_strategy_factory";
import { User } from "@cryptify/common/src/domain/entities/user";

@Injectable()
export class ReportNotificationService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly notificationStrategyFactory: NotificationStrategyFactory,
    ) {}

    async sendReportNotification(userId: number, fileName: string, csv: string): Promise<void> {
        const { email } = await this.usersRepository.findOneBy({ id: userId });

        await this.notificationStrategyFactory.get(NotificationStrategy.EMAIL).sendNotification({
            to: email,
            title: "Transaction History Report",
            body: "Attached below is the generated transaction history report in .CSV format.",
            attachment: {
                filename: fileName,
                content: csv,
            },
        });
    }
}
