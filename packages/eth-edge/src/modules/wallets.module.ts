import { Module } from "@nestjs/common";
import { WalletsController } from "../controllers/wallets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@cryptify/common/src/entities/user";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [WalletsController],
})
export class WalletsModule {}
