import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionsService } from "../services/transactions_service";
import { TransactionWatcherService } from "@cryptify/btc-edge/src/services/transaction_watcher_service";
import { WebSocketModule } from "nestjs-websocket";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { ConfigService } from "@nestjs/config";
import { TransactionsController } from "@cryptify/btc-edge/src/controllers/transactions.controller";
import { WalletsModule } from "./wallets.module";
import { NotificationsModule } from "@cryptify/common/src/utils/notifications/notifications.module";
import { BlockchainComGateway } from "@cryptify/btc-edge/src/gateways/blockchain_com_gateway";

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction, Wallet]),
        WebSocketModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                url: config.get<string>("BLOCKCHAIN_WS_HOST"),
            }),
        }),
        forwardRef(() => WalletsModule),
        NotificationsModule,
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService, BlockchainComGateway, TransactionWatcherService],
    exports: [TransactionsService, TransactionWatcherService],
})
export class TransactionsModule {}
