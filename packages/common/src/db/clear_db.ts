import { DataSource } from "typeorm";
import { dataSourceOptions } from "@cryptify/common/src/db/data_source_options";

export async function clearDB() {
    const dataSource = await new DataSource(dataSourceOptions).initialize();

    await Promise.all(
        dataSource.entityMetadatas.map(async (entity) => {
            await dataSource.manager.query(`TRUNCATE \"${entity.tableName}\" RESTART IDENTITY CASCADE;`);
        }),
    );
}
