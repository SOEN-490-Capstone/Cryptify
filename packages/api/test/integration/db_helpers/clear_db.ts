import {getConnection} from "typeorm";

export async function clearDB() {
    const entities = getConnection().entityMetadatas;

    await Promise.all(entities.map(async (entity) => {
        const repository = getConnection().getRepository(entity.name);
        await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
    }));
}
