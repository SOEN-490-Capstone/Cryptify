import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { User } from "@cryptify/common/src/domain/entities/user";
import { ApiGateway } from "./api_gateway";
import { Method } from "@cryptify/common/src/gateway/abstract_gateway";

export class UsersGateway extends ApiGateway {
    constructor() {
        super();
    }

    async whoami(token: JwtToken): Promise<User> {
        const path = "users/whoami";
        const headers = {
            Authorization: `Bearer ${token.accessToken}`,
        };

        return this.request<User>(Method.GET, headers, path, null);
    }
}
