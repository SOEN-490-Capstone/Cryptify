import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletsService } from "@cryptify/api/src/services/wallets.service";
import { WalletsController } from "@cryptify/api/src/controllers/wallets.controller";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { EdgeGatewayStrategyFactory } from "@cryptify/api/src/gateways/edge-gateway/edge_gateway_strategy_factory";
import { EthEdgeGatewayStrategy } from "@cryptify/api/src/gateways/edge-gateway/eth_edge_gateway_strategy";
import { BtcEdgeGatewayStrategy } from "@cryptify/api/src/gateways/edge-gateway/btc_edge_gateway_strategy";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    providers: [WalletsService, EdgeGatewayStrategyFactory, EthEdgeGatewayStrategy, BtcEdgeGatewayStrategy],
    controllers: [WalletsController],
    exports: [WalletsService],
})
export class WalletsModule {}
