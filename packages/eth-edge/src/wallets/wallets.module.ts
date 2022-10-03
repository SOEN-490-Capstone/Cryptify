import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletsController } from "@cryptify/eth-edge/src/wallets/wallets.controller";
import { Wallet } from "@cryptify/common/src/entities/wallet";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    controllers: [WalletsController],
})
export class WalletsModule {}
