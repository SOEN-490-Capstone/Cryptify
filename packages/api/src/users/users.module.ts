import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "@cryptify/common/src/entities/user";
import { Repository } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, Repository<User>],
    exports: [UsersService],
})
export class UsersModule {}
