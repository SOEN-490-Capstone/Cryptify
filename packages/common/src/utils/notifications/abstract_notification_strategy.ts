export abstract class AbstractNotificationStrategy {
    abstract sendNotification(notification: Notification): Promise<void>;
}

export interface Notification {
    to: string;
    title: string;
    body: string;
    attachment?: {
        filename: string;
        content: string;
    };
}
