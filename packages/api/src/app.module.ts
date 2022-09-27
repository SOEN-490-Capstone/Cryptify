import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseModule } from "@cryptify/api/src/base/base.module";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UsersModule } from "./users/users.module";
import { dbOptions } from "@cryptify/api/src/db_options";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRoot({
            ...dbOptions,
            synchronize: true,
        }),
        BaseModule,
        AuthenticationModule,
        UsersModule,
    ],
})
export class AppModule {}
