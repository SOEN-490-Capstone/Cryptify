import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseController } from "@cryptify/api/src/base/base.controller";
import { BaseService } from "@cryptify/api/src/base/base.service";
import { User } from "@cryptify/common/src/entities/user";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [BaseService],
    controllers: [BaseController],
})
export class BaseModule {}
