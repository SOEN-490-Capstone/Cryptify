import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { TagsService } from "../services/tags.service";
import { TagsController } from "../controllers/tags.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionTag])],
    providers: [TagsService],
    exports: [TagsService],
    controllers: [TagsController],
})
export class TagsModule {}
