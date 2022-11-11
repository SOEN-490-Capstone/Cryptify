import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { TransactionsService } from "../services/transactions_service";
import { SoChainGateway } from "../gateways/so_chain_gateway";
import {BlockchainWebsocketService} from "@cryptify/btc-edge/src/gateways/blockchain_websocket";
import {WebSocketModule} from "nestjs-websocket";

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction]),
        WebSocketModule.forRoot({
            url: "wss://ws.blockchain.info/inv",
        }),
    ],
    providers: [TransactionsService, SoChainGateway, BlockchainWebsocketService],
    exports: [TransactionsService],
})
export class TransactionsModule {}
