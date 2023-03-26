import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { User } from "@cryptify/common/src/domain/entities/user";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "../controllers/users.controller";
import { WalletsModule } from "@cryptify/api/src/modules/wallets.module";
import { Contact } from "@cryptify/common/src/domain/entities/contact";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { AuthenticationModule } from "./authentication.module";
import { Filter } from "@cryptify/common/src/domain/entities/filter";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Tag, Contact, Filter]),
        WalletsModule,
        forwardRef(() => AuthenticationModule),
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
