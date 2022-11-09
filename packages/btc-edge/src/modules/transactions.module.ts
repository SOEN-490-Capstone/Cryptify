import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionsService } from "@cryptify/eth-edge/src/services/transactions.service";
import { SoChainGateway } from "@cryptify/btc-edge/src/gateways/so_chain_gateway";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    providers: [TransactionsService, SoChainGateway],
    exports: [TransactionsService],
})
export class TransactionsModule {}
