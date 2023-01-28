import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlchemyNodeServiceFacade } from "@cryptify/eth-edge/src/services/alchemy_node_facade.service";
import { TransactionsController } from "@cryptify/eth-edge/src/controllers/transactions.controller";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionsService } from "@cryptify/eth-edge/src/services/transactions.service";
import { WalletsModule } from "./wallets.module";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { NotificationsModule } from "@cryptify/common/src/utils/notifications/notifications.module";
import {AlchemyDecorator} from "@cryptify/eth-edge/src/services/alchemy_decorator";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Wallet]), forwardRef(() => WalletsModule), NotificationsModule],
    controllers: [TransactionsController],
    providers: [TransactionsService, AlchemyNodeServiceFacade, AlchemyDecorator],
    exports: [TransactionsService],
})
export class TransactionsModule {}
