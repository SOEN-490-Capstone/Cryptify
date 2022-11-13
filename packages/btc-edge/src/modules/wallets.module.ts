import { forwardRef, Module } from "@nestjs/common";
import { WalletsController } from "../controllers/wallets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { WalletsService } from "../services/wallets.service";
import { SoChainGateway } from "../gateways/so_chain_gateway";
import { TransactionsModule } from "./transactions.module";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

@Module({
    imports: [
        TypeOrmModule.forFeature([Wallet, Transaction]),
        TransactionsModule,
        forwardRef(() => TransactionsModule),
    ],
    controllers: [WalletsController],
    providers: [WalletsService, SoChainGateway],
    exports: [WalletsService],
})
export class WalletsModule {}
