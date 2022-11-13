import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { TagsService } from "../services/tags.service";
import { TagsController } from "../controllers/tags.controller";
import { UsersModule } from "./users.module";

@Module({
    imports: [TypeOrmModule.forFeature([Tag]), UsersModule],
    providers: [TagsService],
    exports: [TagsService],
    controllers: [TagsController],
})
export class TagsModule {}
