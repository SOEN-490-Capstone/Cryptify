import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { TagsService } from "../services/tags.service";
import { TagsController } from "../controllers/tags.controller";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";

@Module({
    imports: [TypeOrmModule.forFeature([Tag, Transaction])],
    providers: [TagsService],
    exports: [TagsService],
    controllers: [TagsController],
})
export class TagsModule {}
