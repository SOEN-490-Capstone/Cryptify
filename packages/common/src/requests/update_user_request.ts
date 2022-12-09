export interface UpdateUserRequest {
    userId: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    areNotificationsEnabled?: boolean;
}
