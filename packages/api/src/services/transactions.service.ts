import { Injectable } from "@nestjs/common";
import { GetTransactionsRequest } from "@cryptify/common/src/requests/get_transaction_request";
import { EdgeGatewayStrategyFactory } from "@cryptify/api/src/gateways/edge-gateway/edge_gateway_strategy_factory";
import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

@Injectable()
export class TransactionsService {
    constructor(private readonly edgeGatewayStrategyFactory: EdgeGatewayStrategyFactory) {}

    async findAll(req: GetTransactionsRequest): Promise<Transaction[]> {
        // Map through the currency types to build a list of strategies, then map through each strategy
        // and get the transactions from the associated edge service in parallel, finally flatten the 2D
        // array of wallets into a single array
        const strategies = Object.keys(CurrencyType).map((type) =>
            this.edgeGatewayStrategyFactory.get(CurrencyType[type]),
        );
        const transactionsByType = await Promise.all(strategies.map((strategy) => strategy.getTransactions(req)));
        return transactionsByType.flat();
    }
}
