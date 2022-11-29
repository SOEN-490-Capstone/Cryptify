import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlchemyNodeServiceFacade } from "@cryptify/eth-edge/src/services/alchemy_node_facade.service";
import { TransactionsController } from "@cryptify/eth-edge/src/controllers/transactions.controller";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionsService } from "@cryptify/eth-edge/src/services/transactions.service";
import { WalletsModule } from "./wallets.module";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Wallet]), forwardRef(() => WalletsModule)],
    controllers: [TransactionsController],
    providers: [TransactionsService, AlchemyNodeServiceFacade],
    exports: [TransactionsService],
})
export class TransactionsModule {}
