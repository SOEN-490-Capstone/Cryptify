import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { LocalStrategy } from "@cryptify/api/src/authentication/local.strategy";
import { UsersModule } from "@cryptify/api/src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "@cryptify/api/src/authentication/jwt.strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
    controllers: [AuthenticationController],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        UsersModule,
        PassportModule,
        JwtModule.register({
            signOptions: { expiresIn: "9999 years" },
            secret: process.env.JWT_SECRET,
        }),
    ],
    providers: [AuthenticationService, LocalStrategy, JwtStrategy],
    exports: [AuthenticationService],
})
export class AuthenticationModule {}
