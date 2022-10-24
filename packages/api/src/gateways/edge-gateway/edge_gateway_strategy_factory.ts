import { CurrencyType } from "@cryptify/common/src/domain/currency_type";
import { AbstractEdgeGatewayStrategy } from "@cryptify/api/src/gateways/edge-gateway/abstract_edge_gateway_strategy";
import { EthEdgeGatewayStrategy } from "@cryptify/api/src/gateways/edge-gateway/eth_edge_gateway_strategy";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EdgeGatewayStrategyFactory {
    constructor(private readonly ethEdgeGatewayStrategy: EthEdgeGatewayStrategy) {}

    get(currencyType: CurrencyType): AbstractEdgeGatewayStrategy {
        if (currencyType == CurrencyType.ETHEREUM) {
            return this.ethEdgeGatewayStrategy;
        }
        if (currencyType == CurrencyType.BITCOIN) {
            throw new Error();
        }
    }
}
