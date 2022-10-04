import { Module } from "@nestjs/common";
import { WalletsController } from "./wallets.controller";

@Module({
    controllers: [WalletsController],
})
export class WalletsModule {}
