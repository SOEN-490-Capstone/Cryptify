import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionsService } from "@cryptify/eth-edge/src/services/transactions.service";
import { AlchemyNodeService } from "@cryptify/eth-edge/src/services/alchemy_node.service";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    exports: [TransactionsService],
    providers: [TransactionsService, AlchemyNodeService],
})
export class TransactionModule {}
