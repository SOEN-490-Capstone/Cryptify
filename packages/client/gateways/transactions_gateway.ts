import { JwtToken } from "@cryptify/common/src/domain/jwt_token";
import { GetTransactionsRequest } from "@cryptify/common/src/requests/get_transaction_request";
import { AbstractApiGateway } from "./abstract_api_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

export class TransactionsGateway extends AbstractApiGateway {
    constructor() {
        super();
    }

    async findAllTransactions(req: GetTransactionsRequest, token: JwtToken): Promise<Transaction[]> {
        const path = `users/${req.id}/transactions`;
        const headers = {
            Authorization: `Bearer ${token.accessToken}`,
        };

        return this.request<Transaction[]>(Method.GET, headers, path, null);
    }
}
