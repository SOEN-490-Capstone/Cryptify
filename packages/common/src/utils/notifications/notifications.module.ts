import { Module } from "@nestjs/common";
import { ReportNotificationService } from "@cryptify/common/src/utils/notifications/report_notification_service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@cryptify/common/src/domain/entities/user";
import { TransactionNotificationService } from "@cryptify/common/src/utils/notifications/transaction_notification_service";
import { NotificationStrategyFactory } from "@cryptify/common/src/utils/notifications/notification_strategy_factory";
import { EmailNotificationStrategy } from "@cryptify/common/src/utils/notifications/email_notification_strategy";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";

@Module({
    imports: [TypeOrmModule.forFeature([User, Wallet])],
    providers: [
        TransactionNotificationService,
        ReportNotificationService,
        NotificationStrategyFactory,
        EmailNotificationStrategy,
    ],
    exports: [TransactionNotificationService, ReportNotificationService],
})
export class NotificationsModule {}
