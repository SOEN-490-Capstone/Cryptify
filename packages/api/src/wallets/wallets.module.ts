import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletsService } from "@cryptify/api/src/wallets/wallets.service";
import { WalletsController } from "@cryptify/api/src/wallets/wallets.controller";
import { Wallet } from "@cryptify/common/src/entities/wallet";
import { EthEdgeRequest } from "@cryptify/api/src/gateways/eth_edge_request";
import { AuthorizationInterceptor } from "@cryptify/api/src/wallets/interceptors/authorization.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    providers: [WalletsService, EthEdgeRequest],
    controllers: [WalletsController],
})
export class WalletsModule {}
