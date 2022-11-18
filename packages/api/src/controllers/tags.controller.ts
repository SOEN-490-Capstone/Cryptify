import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { JwtAuthGuard } from "@cryptify/api/src/guards/jwt-auth.guard";
import { CanAccessResourceGuard } from "@cryptify/api/src/guards/can_access_resource.guard";
import { getTagsSchema } from "@cryptify/common/src/validations/get_tags_schema";
import { GetTagsRequest } from "@cryptify/common/src/requests/get_tags_request";
import { createTagSchema } from "@cryptify/common/src/validations/create_tag_schema";
import { CreateTagRequest } from "@cryptify/common/src/requests/create_tag_request";
import { TagsService } from "../services/tags.service";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { CanMutateResourceGuard } from "../guards/can_mutate_resource.guard";

@Controller()
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @UseGuards(JwtAuthGuard, CanAccessResourceGuard)
    @Get("/users/:id/tags")
    async get(@Param() params: GetTagsRequest): Promise<TransactionTag[]> {
        const getTagsReq = await useValidate(getTagsSchema, params);
        return this.tagsService.findAll(getTagsReq.id);
    }

    @UseGuards(JwtAuthGuard, CanMutateResourceGuard)
    @Post("/users/:id/tags")
    async create(@Body() body: CreateTagRequest): Promise<TransactionTag> {
        const createTagReq = await useValidate(createTagSchema, body);
        return this.tagsService.create(createTagReq);
    }
}
