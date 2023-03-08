import { CacheInterceptor, CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseModule } from "@cryptify/api/src/modules/base.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthenticationModule } from "./authentication.module";
import { UsersModule } from "./users.module";
import { WalletsModule } from "./wallets.module";
import { dataSourceOptionsConfig } from "@cryptify/common/src/db/data_source_options";
import { TransactionsModule } from "./transactions.module";
import { TagsModule } from "./tags.module";
import { ContactsModule } from "./contacts.module";
import { ReportsModule } from "@cryptify/api/src/modules/reports.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { FiltersModule } from "@cryptify/api/src/modules/filters.module";

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
        CacheModule.register({
            ttl: 10 * 1000, // 10 seconds
        }),
        BaseModule,
        AuthenticationModule,
        UsersModule,
        WalletsModule,
        TransactionsModule,
        TagsModule,
        ContactsModule,
        ReportsModule,
        FiltersModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {}
