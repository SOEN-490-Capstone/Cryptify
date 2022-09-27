import { DataSource } from "typeorm";
import { dbOptions } from "@cryptify/api/src/db_options";

export async function clearDB() {
    const dataSource = await new DataSource(dbOptions).initialize();

    await Promise.all(
        dataSource.entityMetadatas.map(async (entity) => {
            await dataSource.manager.query(`TRUNCATE \"${entity.tableName}\" RESTART IDENTITY CASCADE;`);
        }),
    );
}
