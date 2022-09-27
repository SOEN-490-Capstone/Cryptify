import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { User } from "@cryptify/common/src/entities/user";

const entities = [User];

export const dbOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities,
};
