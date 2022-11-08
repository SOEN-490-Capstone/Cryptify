import { Module } from "@nestjs/common";
import { BaseController } from "../controllers/base.controller";

@Module({
    controllers: [BaseController],
})
export class BaseModule {}
