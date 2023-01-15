import { Injectable } from "@nestjs/common";
import { EmailNotificationStrategy } from "@cryptify/common/src/utils/notifications/email_notification_strategy";
import { AbstractNotificationStrategy } from "@cryptify/common/src/utils/notifications/abstract_notification_strategy";

@Injectable()
export class NotificationStrategyFactory {
    constructor(private readonly emailNotificationStrategy: EmailNotificationStrategy) {}

    get(strategy: NotificationStrategy): AbstractNotificationStrategy {
        if (strategy == NotificationStrategy.EMAIL) {
            return this.emailNotificationStrategy;
        }
        if (strategy == NotificationStrategy.PUSH_NOTIFICATION) {
            throw new Error("Push notification strategy not yet implemented");
        }
    }
}

export enum NotificationStrategy {
    EMAIL,
    PUSH_NOTIFICATION,
}
