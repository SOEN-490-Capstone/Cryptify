import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer from "nodemailer";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {
    AbstractNotificationServiceTemplateMethod,
    Notification,
} from "@cryptify/common/src/utils/notifications/abstract_notification_service_template_method";

@Injectable()
export class EmailNotificationService extends AbstractNotificationServiceTemplateMethod {
    private readonly transporter: nodemailer.Transporter;
    private readonly from: string = "noreply@cryptify.com";

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Wallet) walletsRepository: Repository<Wallet>,
    ) {
        super(walletsRepository);
        this.transporter = nodemailer.createTransport({
            host: configService.get<string>("NODEMAILER_HOST"),
            port: +configService.get<number>("NODEMAILER_PORT"),
            auth: {
                user: configService.get<string>("NODEMAILER_USERNAME"),
                pass: configService.get<string>("NODEMAILER_PASSWORD"),
            },
        });
    }

    protected async sendNotification(notification: Notification): Promise<void> {
        await this.transporter.sendMail({
            from: this.from,
            to: notification.to,
            subject: notification.title,
            text: notification.body,
        });
    }
}
