import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionsService } from "../services/transactions_service";
import { SoChainGateway } from "../gateways/so_chain_gateway";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    providers: [TransactionsService, SoChainGateway],
    exports: [TransactionsService],
})
export class TransactionsModule {}
