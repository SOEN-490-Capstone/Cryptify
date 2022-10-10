import { Module } from "@nestjs/common";
import { WalletsController } from "../controllers/wallets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { WalletsService } from "@cryptify/eth-edge/src/services/wallets.service";
import { AlchemyNodeService } from "@cryptify/eth-edge/src/services/alchemy_node.service";
import { TransactionsService } from "@cryptify/eth-edge/src/services/transactions.service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionModule } from "./transactions.module";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet]), TransactionModule],
    controllers: [WalletsController],
    providers: [WalletsService, AlchemyNodeService],
})
export class WalletsModule {}
