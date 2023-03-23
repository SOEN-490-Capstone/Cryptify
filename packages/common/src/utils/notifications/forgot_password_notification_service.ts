import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "@cryptify/common/src/domain/entities/user";
import { EmailNotificationStrategy } from "./email_notification_strategy";
import { JwtToken } from "../../domain/jwt_token";

@Injectable()
export class AuthNotificationService {
    constructor(
        private readonly emailNotificationStrategy: EmailNotificationStrategy,
        private readonly configService: ConfigService,
    ) {}

    async sendForgotPasswordEmail(user: User, token: JwtToken): Promise<void> {
        const appName = this.configService.get<string>("APP_NAME");
        const appIP = this.configService.get<string>("APP_URL");
        const appPort = this.configService.get<string>("APP_PORT");

        const uri = `${appName}://${appIP}:${appPort}/--/forgot-password/${token.accessToken}`;

        const title = `Reset your password`;
        const body = `Hi ${user.firstName},<br/>
        You recently requested to reset your password. Please click on the link below to proceed.<br/>
        <a href=${uri}>Click to reset your password</a><br/>
        If you did not request a password reset, please ignore this email.`;

        await this.emailNotificationStrategy.sendNotification({
            to: user.email,
            title,
            body,
        });
    }
}
