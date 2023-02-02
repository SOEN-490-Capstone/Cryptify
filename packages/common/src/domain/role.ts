import { User } from "@cryptify/common/src/domain/entities/user";

export enum Role {
    BASIC = "BASIC",
    PRO = "PRO",
}

export function isPro(user: User): boolean {
    return user.role === Role.PRO;
}
