import {Controller, Get, Param, UseGuards, Post, Body, Delete, Query} from "@nestjs/common";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { JwtAuthGuard } from "@cryptify/api/src/guards/jwt-auth.guard";
import { CanAccessResourceGuard } from "@cryptify/api/src/guards/can_access_resource.guard";
import { GetFiltersRequest, getFiltersSchema } from "@cryptify/common/src/validations/get_filters_schema";
import { FiltersService } from "../services/filters.service";
import { CanMutateResourceGuard } from "../guards/can_mutate_resource.guard";
import { CreateFilterRequest, createFilterSchema } from "@cryptify/common/src/validations/create_filter_schema";
import { Filter } from "@cryptify/common/src/domain/entities/filter";
import { DeleteFilterRequest, deleteFilterSchema } from "@cryptify/common/src/validations/delete_filter_schema";

@Controller()
export class FiltersController {
    constructor(private readonly filtersService: FiltersService) {}

    @UseGuards(JwtAuthGuard, CanAccessResourceGuard)
    @Get("/users/:id/filters")
    async get(@Param() params: GetFiltersRequest, @Query() query): Promise<Filter[]> {
        const req = await useValidate(getFiltersSchema, {...params, ...query});
        return this.filtersService.findAll(req);
    }

    @UseGuards(JwtAuthGuard, CanMutateResourceGuard)
    @Post("/users/:id/filters")
    async create(@Body() body: CreateFilterRequest): Promise<Filter> {
        const req = await useValidate(createFilterSchema, body);
        return this.filtersService.create(req);
    }

    @UseGuards(JwtAuthGuard, CanMutateResourceGuard)
    @Delete("/users/:id/filters/:name")
    async delete(@Param() params: DeleteFilterRequest, @Query() query): Promise<Filter> {
        const req = await useValidate(deleteFilterSchema, {...params, ...query});
        return this.filtersService.delete(req);
    }
}
