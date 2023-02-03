import { Role } from "@cryptify/common/src/domain/role";

export interface UpdateUserRequest {
    userId: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    areNotificationsEnabled?: boolean;
    role?: Role;
}
