import { Role } from "@cryptify/common/src/domain/role";

export interface UpdateUserRequest {
    userId: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    confirmEmail?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
    areNotificationsEnabled?: boolean;
    role?: Role;
}
