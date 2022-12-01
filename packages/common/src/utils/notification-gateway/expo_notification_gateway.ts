import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {Method} from "@cryptify/common/src/utils/gateway/abstract_gateway";
import {AbstractServiceGateway} from "@cryptify/common/src/utils/gateway/abstract_service_gateway";
import {NotificationGateway} from "@cryptify/common/src/utils/notification-gateway/abstract_notification_gateway";
import {PushNotification} from "@cryptify/common/src/utils/notification-gateway/notification_gateway";

@Injectable()
export class SmsNotificationGateway extends AbstractServiceGateway implements NotificationGateway {
    constructor(private configService: ConfigService) {
        const host = configService.get<string>("EXPO_HOST");
        super(`https://${host}`);
    }

    async sendPushNotification(pushNotification: PushNotification): Promise<void> {
        const path = "push/send";
        const expoPushNotification: ExpoPushNotification = {
            ...pushNotification,
            to: "TOKEN",
            sound: 'default',
            data: {},
        }

        const headers = {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        };

        await this.request<void>(Method.POST, headers, path, expoPushNotification);
    }
}

interface ExpoPushNotification extends PushNotification {
    to: ExpoPushToken,
    sound: 'default',
    data: { [key: string]: string },
}

type ExpoPushToken = string;
