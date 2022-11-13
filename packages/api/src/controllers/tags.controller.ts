import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { useValidate } from "@cryptify/common/src/hooks/use_validate";
import { JwtAuthGuard } from "@cryptify/api/src/guards/jwt-auth.guard";
import { CanMutateResourceGuard } from "@cryptify/api/src/guards/can_mutate_resource.guard";
import { CanAccessResourceGuard } from "@cryptify/api/src/guards/can_access_resource.guard";
import { PostTagRequest } from "@cryptify/common/src/requests/post_tag_request";
import { getTagSchema } from "@cryptify/common/src/validations/get_tag_schema";
import { postTagSchema } from "@cryptify/common/src/validations/post_tag_schema";
import { GetTagRequest } from "@cryptify/common/src/requests/get_tag_request";
import { TagsService } from "../services/tags.service";

@Controller()
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @UseGuards(JwtAuthGuard, CanMutateResourceGuard)
    @Post("users/:id/tag/:tagName")
    async create(@Param() params: PostTagRequest) {
        const postTagReq = await useValidate(postTagSchema, params);
        return this.tagsService.createTag(postTagReq.id, postTagReq.tagName);
    }

    @UseGuards(JwtAuthGuard, CanAccessResourceGuard)
    @Get("users/:id/tag")
    async get(@Param() params: GetTagRequest) {
        const postTagReq = await useValidate(getTagSchema, params);
        return this.tagsService.findTagsById(postTagReq.id);
    }
}
