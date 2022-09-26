import { Module } from "@nestjs/common";
import { BaseController } from "./base.controller";
import { AppService } from "../app.service";

@Module({
    imports: [],
    controllers: [BaseController],
    providers: [AppService],
})
export class BaseModule {}
