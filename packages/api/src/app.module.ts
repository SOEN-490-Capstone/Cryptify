import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@cryptify/common/src/entities/user";
import { BaseModule } from "@cryptify/api/src/base/base.module";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UsersModule } from "./users/users.module";

const entities = [User];

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.PG_HOST,
            port: +process.env.PG_PORT,
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            entities,
            synchronize: true,
        }),
        BaseModule,
        AuthenticationModule,
        UsersModule,
    ],
})
export class AppModule {}
