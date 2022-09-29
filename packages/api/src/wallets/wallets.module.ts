import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletsService } from "@cryptify/api/src/wallets/wallets.service";
import { WalletsController } from "@cryptify/api/src/wallets/wallets.controller";
import { Wallet } from "@cryptify/common/src/entities/wallet";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    providers: [WalletsService],
    controllers: [WalletsController],
})
export class WalletsModule {}
