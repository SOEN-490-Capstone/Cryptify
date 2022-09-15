import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseController } from "@cryptify/api/src/base/base.controller";
import { BaseService } from "@cryptify/api/src/base/base.service";
import { User } from "@cryptify/common/src/entities/user";
import { AuthenticationController } from "@cryptify/api/src/authentication/authentication.controller";
import { UsersService } from "@cryptify/api/src/users/users.service";
import { AuthenticationService } from "@cryptify/api/src/authentication/authentication.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [BaseService, UsersService, AuthenticationService, JwtService],
    controllers: [BaseController, AuthenticationController],
})
export class BaseModule {}
