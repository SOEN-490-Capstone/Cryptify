import { Module } from "@nestjs/common";
import { WalletsController } from "../controllers/wallets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { WalletsService } from "@cryptify/eth-edge/src/services/wallets.service";
import { AlchemyNodeService } from "@cryptify/eth-edge/src/services/alchemy_node.service";
import { TransactionsService } from "@cryptify/eth-edge/src/services/transactions.service";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    controllers: [WalletsController],
    providers: [WalletsService, AlchemyNodeService, TransactionsService],
})
export class WalletsModule {}
