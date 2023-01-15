import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer from "nodemailer";
import {
    AbstractNotificationStrategy,
    Notification,
} from "@cryptify/common/src/utils/notifications/abstract_notification_strategy";

@Injectable()
export class EmailNotificationStrategy extends AbstractNotificationStrategy {
    private readonly transporter: nodemailer.Transporter;
    private readonly from: string = "noreply@cryptify.com";

    constructor(private readonly configService: ConfigService) {
        super();
        this.transporter = nodemailer.createTransport({
            host: configService.get<string>("NODEMAILER_HOST"),
            port: +configService.get<number>("NODEMAILER_PORT"),
            auth: {
                user: configService.get<string>("NODEMAILER_USERNAME"),
                pass: configService.get<string>("NODEMAILER_PASSWORD"),
            },
        });
    }

    async sendNotification(notification: Notification): Promise<void> {
        const attachments = notification.attachment ? [notification.attachment] : [];

        // If there is an error while sending an email then silently fail, the application shouldn't stop because of an
        // error or misconfiguration here during runtime, this also helps silence errors during integration tests when
        // the credentials are incorrect
        try {
            await this.transporter.sendMail({
                from: this.from,
                to: notification.to,
                subject: notification.title,
                text: notification.body,
                attachments,
            });
        } catch (e) {}
    }
}
