import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseController } from "@cryptify/api/src/base/base.controller";
import { BaseService } from "@cryptify/api/src/base/base.service";
import { User } from "@cryptify/common/src/entities/user";
import { UsersService } from "@cryptify/api/src/users/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [BaseService, UsersService],
    controllers: [BaseController],
})
export class BaseModule {}
