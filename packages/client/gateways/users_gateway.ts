import { User } from "@cryptify/common/src/domain/entities/user";
import { AbstractApiGateway } from "./abstract_api_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { UpdateUserRequest } from "@cryptify/common/src/requests/update_user_request";

export class UsersGateway extends AbstractApiGateway {
    constructor() {
        super();
    }

    async whoami(token: string): Promise<User> {
        // By adding the token as a query parameter we can make sure this route is only cached for the same token
        const path = `users/whoami?token=${token}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<User>(Method.GET, headers, path, null);
    }

    async update(req: UpdateUserRequest, token: string): Promise<User> {
        const path = `users/${req.userId}`;

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<User>(Method.PATCH, headers, path, req);
    }
}
