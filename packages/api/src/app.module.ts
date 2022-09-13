import { Module } from "@nestjs/common";
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {User} from "@cryptify/common/src/entities/user";
import {BaseModule} from "@cryptify/api/src/base/base.module";

const entities = [User];
const ormOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'api-db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'cryptify_api_db',
  entities,
  synchronize: true,
};

@Module({
    imports: [
        TypeOrmModule.forRoot(ormOptions),
        BaseModule,
    ],
})
export class AppModule {}
