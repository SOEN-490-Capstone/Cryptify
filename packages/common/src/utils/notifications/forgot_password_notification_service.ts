import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

import { User } from "@cryptify/common/src/domain/entities/user";
import { EmailNotificationStrategy } from "./email_notification_strategy";
import { JwtToken } from "../../domain/jwt_token";

@Injectable()
export class ForgotPasswordService {
    constructor(
        private readonly emailNotificationStrategy: EmailNotificationStrategy,
    ) {}

    async sendForgotPassword(user: User, token: JwtToken): Promise<void> {

        const appName = "exp";
        const appIP = "192.168.2.14";
        const appPort = "19000";

        const url = `${appName}://${appIP}:${appPort}/--/forgot-password/${token.accessToken}`;

        console.log(user);

        const title = `Reset your password`;
        const body = `Hi ${user.firstName},<br/>
        you recently requested to reset your password.<br/>
        <a href=${url}>Click to reset your password</a><br/>
        if you did not request a password reset please ignore this email.`;

        await this.emailNotificationStrategy.sendNotification({
            to: user.email,
            title,
            body,
        });
    }
}
