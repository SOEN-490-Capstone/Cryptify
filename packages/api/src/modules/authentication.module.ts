import { Module, forwardRef } from "@nestjs/common";
import { AuthenticationService } from "../services/authentication.service";
import { AuthenticationController } from "../controllers/authentication.controller";
import { UsersModule } from "./users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { ConfigService } from "@nestjs/config";

@Module({
    controllers: [AuthenticationController],
    imports: [
        forwardRef(() => UsersModule),
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: "9999 years" },
            }),
        }),
    ],
    providers: [AuthenticationService, JwtStrategy],
    exports: [AuthenticationService],
})
export class AuthenticationModule {}
