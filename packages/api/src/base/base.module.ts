import { Module } from "@nestjs/common";
import { BaseController } from "@cryptify/api/src/base/base.controller";
import { BaseService } from "@cryptify/api/src/base/base.service";

@Module({
    providers: [BaseService],
    controllers: [BaseController],
})
export class BaseModule {}
