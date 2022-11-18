import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { TagsService } from "../services/tags.service";
import { TagsController } from "../controllers/tags.controller";
import { UsersModule } from "./users.module";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionTag]), UsersModule],
    providers: [TagsService],
    exports: [TagsService],
    controllers: [TagsController],
})
export class TagsModule {}