import { DataSource } from "typeorm";
import { dataSourceOptionsProcess } from "@cryptify/common/src/db/data_source_options";

export async function clearDB() {
    const dataSource = await new DataSource(dataSourceOptionsProcess(process)).initialize();

    await Promise.all(
        dataSource.entityMetadatas.map(async (entity) => {
            await dataSource.manager.query(`TRUNCATE \"${entity.tableName}\" RESTART IDENTITY CASCADE;`);
        }),
    );
}