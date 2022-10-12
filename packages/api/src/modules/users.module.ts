import { Module } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { User } from "@cryptify/common/src/domain/entities/user";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "../controllers/users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
