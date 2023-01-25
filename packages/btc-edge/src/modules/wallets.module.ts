import { forwardRef, Module } from "@nestjs/common";
import { WalletsController } from "../controllers/wallets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { WalletsService } from "../services/wallets.service";
import { TransactionsModule } from "./transactions.module";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import {BlockchainComGateway} from "@cryptify/btc-edge/src/gateways/blockchain_com_gateway";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet, Transaction]), forwardRef(() => TransactionsModule)],
    controllers: [WalletsController],
    providers: [WalletsService, BlockchainComGateway],
    exports: [WalletsService],
})
export class WalletsModule {}
