import { DataSource } from "typeorm";
import { dataSourceOptionsManual } from "@cryptify/common/src/db/data_source_options";

export async function clearDB(isTest = false) {
    const config = isTest
        ? process.env
        : {
              PG_HOST: "db",
              PG_PORT: 5432,
              PG_USER: "postgres",
              PG_PASSWORD: "postgres",
              PG_DATABASE: "cryptify_db",
          };
    const dataSource = await new DataSource(dataSourceOptionsManual(config)).initialize();

    await Promise.all(
        dataSource.entityMetadatas.map(async (entity) => {
            await dataSource.manager.query(`TRUNCATE \"${entity.tableName}\" RESTART IDENTITY CASCADE;`);
        }),
    );
}
