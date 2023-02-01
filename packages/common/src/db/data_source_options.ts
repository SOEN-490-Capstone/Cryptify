import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { User } from "@cryptify/common/src/domain/entities/user";
import { Wallet } from "@cryptify/common/src/domain/entities/wallet";
import { Transaction } from "../domain/entities/transaction";
import { ConfigService } from "@nestjs/config";
import { Tag } from "../domain/entities/tag";
import { Contact } from "../domain/entities/contact";

const entities = [User, Wallet, Transaction, Tag, Contact];

export function dataSourceOptionsProcess(process: NodeJS.Process): DataSourceOptions {
    return dataSourceOptionsTemplateMethod(<T>(key: string) => process.env[key] as T, true);
}

export function dataSourceOptionsConfig(config: ConfigService): DataSourceOptions {
    return dataSourceOptionsTemplateMethod(<T>(key: string) => config.get<T>(key));
}

function dataSourceOptionsTemplateMethod(config: <T>(string) => T, clear = false): DataSourceOptions {
    return {
        type: "postgres",
        host: config<string>("PG_HOST"),
        port: +config<number>("PG_PORT"),
        username: config<string>("PG_USER"),
        password: config<string>("PG_PASSWORD"),
        database: config<string>("PG_DATABASE"),
        entities,
        synchronize: clear,
        dropSchema: clear,
    };
}
