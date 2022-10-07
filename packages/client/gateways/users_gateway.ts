import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { Method, request } from "./request";
import { User } from "@cryptify/common/src/domain/entities/user";

async function whoami(token: JwtToken): Promise<User> {
    const path = "users/whoami";
    const headers = {
        Authorization: `Bearer ${token.accessToken}`,
    };

    return request<User>(Method.GET, headers, path, null);
}

export default {
    whoami,
};
