import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseModule } from "@cryptify/eth-edge/src/base/base.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {dataSourceOptionsConfig} from "@cryptify/common/src/db/data_source_options";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "test-db",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "cryptify_test_db",
            synchronize: true,
        }),
        BaseModule,
    ],
})
export class AppModule {}
