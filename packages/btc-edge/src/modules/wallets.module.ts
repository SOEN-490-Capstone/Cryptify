import { forwardRef, Module } from "@nestjs/common";
import { WalletsController } from "../controllers/wallets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { WalletsService } from "@cryptify/eth-edge/src/services/wallets.service";
import { AlchemyNodeServiceFacade } from "@cryptify/eth-edge/src/services/alchemy_node_facade.service";
import { AlchemyNodeGateway } from "@cryptify/eth-edge/src/gateways/alchemy_node.gateway";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    controllers: [WalletsController],
})
export class WalletsModule {}
