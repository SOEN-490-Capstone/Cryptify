import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Filter } from "@cryptify/common/src/domain/entities/filter";
import { FiltersService } from "@cryptify/api/src/services/filters.service";
import { FiltersController } from "@cryptify/api/src/controllers/filters.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Filter])],
    providers: [FiltersService],
    controllers: [FiltersController],
})
export class FiltersModule {}
