import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseModule } from "@cryptify/api/src/modules/base.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthenticationModule } from "./authentication.module";
import { UsersModule } from "./users.module";
import { WalletsModule } from "./wallets.module";
import { dataSourceOptionsConfig } from "@cryptify/common/src/db/data_source_options";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                ...dataSourceOptionsConfig(config),
                synchronize: true,
            }),
        }),
        BaseModule,
        AuthenticationModule,
        UsersModule,
        WalletsModule,
    ],
})
export class AppModule {}
