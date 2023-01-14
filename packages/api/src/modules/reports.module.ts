import { Module } from "@nestjs/common";
import { ReportsService } from "@cryptify/api/src/services/reports.service";
import { ReportsController } from "@cryptify/api/src/controllers/reports.controller";
import { EdgeGatewayStrategyFactory } from "@cryptify/api/src/gateways/edge-gateway/edge_gateway_strategy_factory";
import { EthEdgeGatewayStrategy } from "@cryptify/api/src/gateways/edge-gateway/eth_edge_gateway_strategy";
import { BtcEdgeGatewayStrategy } from "@cryptify/api/src/gateways/edge-gateway/btc_edge_gateway_strategy";
import { ContactsModule } from "@cryptify/api/src/modules/contacts.module";

@Module({
    imports: [ContactsModule],
    providers: [ReportsService, EdgeGatewayStrategyFactory, EthEdgeGatewayStrategy, BtcEdgeGatewayStrategy],
    exports: [ReportsService],
    controllers: [ReportsController],
})
export class ReportsModule {}
