import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletsService } from "@cryptify/api/src/services/wallets.service";
import { WalletsController } from "@cryptify/api/src/controllers/wallets.controller";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { EthEdgeGateway } from "@cryptify/api/src/gateways/eth_edge_gateway";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    providers: [WalletsService, EthEdgeGateway],
    controllers: [WalletsController],
})
export class WalletsModule {}