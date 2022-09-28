import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseModule } from "@cryptify/eth-edge/src/base/base.module";
import { ConfigModule } from "@nestjs/config";
import {dataSourceOptions} from "@cryptify/common/src/data_source_options";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRoot({
            ...dataSourceOptions,
            synchronize: true,
        }),
        BaseModule,
    ],
})
export class AppModule {}
