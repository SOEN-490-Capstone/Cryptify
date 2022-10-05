import { Module } from "@nestjs/common";
import { WalletsController } from "../controllers/wallets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "@cryptify/common/src/entities/wallet";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    controllers: [WalletsController],
})
export class WalletsModule {}
