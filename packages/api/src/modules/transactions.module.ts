import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EdgeGatewayStrategyFactory } from "@cryptify/api/src/gateways/edge-gateway/edge_gateway_strategy_factory";
import { EthEdgeGatewayStrategy } from "@cryptify/api/src/gateways/edge-gateway/eth_edge_gateway_strategy";
import { BtcEdgeGatewayStrategy } from "@cryptify/api/src/gateways/edge-gateway/btc_edge_gateway_strategy";
import { TransactionsController } from "../controllers/transactions.controller";
import { TransactionsService } from "../services/transactions.service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { ContactsModule } from "@cryptify/api/src/modules/contacts.module";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), ContactsModule],
    providers: [TransactionsService, EdgeGatewayStrategyFactory, EthEdgeGatewayStrategy, BtcEdgeGatewayStrategy],
    controllers: [TransactionsController],
})
export class TransactionsModule {}
