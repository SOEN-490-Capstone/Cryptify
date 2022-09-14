import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { LocalStrategy } from "@cryptify/api/src/authentication/local.strategy";
import { UsersModule } from "@cryptify/api/src/users/users.module";
import { PassportModule } from "@nestjs/passport";

@Module({
    controllers: [AuthenticationController],
    imports: [UsersModule, PassportModule],
    providers: [AuthenticationService, LocalStrategy],
})
export class AuthenticationModule {}
