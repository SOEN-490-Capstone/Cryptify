import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseModule } from "@cryptify/eth-edge/src/modules/base.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
    ],
})
export class AppModule {}
