import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { TagsService } from "../services/tags.service";
import { TagsController } from "../controllers/tags.controller";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import {Filter} from "@cryptify/common/src/domain/entities/filter";
import {FiltersService} from "@cryptify/api/src/services/filters.service";
import {FiltersController} from "@cryptify/api/src/controllers/filters.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Filter])],
    providers: [FiltersService],
    controllers: [FiltersController],
})
export class FiltersModule {}
