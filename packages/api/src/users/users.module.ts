import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "@cryptify/common/src/domain/entities/user";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
