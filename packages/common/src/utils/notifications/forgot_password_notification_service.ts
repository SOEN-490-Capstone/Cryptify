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

        console.log(user);

        const title = `Reset your password`;
        const body = `Hi ${user.firstName},\n
        you recently requested to reset your password.\n
        <a href=${token.accessToken}>Click to reset your password</a>\n
        if you did not request a password reset please ignore this email.`;

        await this.emailNotificationStrategy.sendNotification({
            to: user.email,
            title,
            body,
        });
    }
}
