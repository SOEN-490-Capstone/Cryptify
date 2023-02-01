import { GetTagsRequest } from "@cryptify/common/src/requests/get_tags_request";
import { UpdateTagRequest } from "@cryptify/common/src/requests/update_tag_request";
import { AbstractApiGateway } from "./abstract_api_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { CreateTagRequest } from "@cryptify/common/src/requests/create_tag_request";
import { DeleteTagRequest } from "@cryptify/common/src/requests/delete_tag_request";

export class TagsGateway extends AbstractApiGateway {
    constructor() {
        super();
    }

    async findAllTags(req: GetTagsRequest, token: string): Promise<Tag[]> {
        const path = `users/${req.id}/tags`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Tag[]>(Method.GET, headers, path, null);
    }

    async createTags(req: CreateTagRequest, token: string): Promise<Tag> {
        const path = `users/${req.userId}/tags`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Tag>(Method.POST, headers, path, req);
    }

    async updateTag(req: UpdateTagRequest, token: string): Promise<Tag> {
        const path = `users/${req.userId}/tags`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Tag>(Method.PATCH, headers, path, req);
    }

    async deleteTag(req: DeleteTagRequest, token: string): Promise<Tag> {
        const path = `users/${req.id}/tags/${req.name}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Tag>(Method.DELETE, headers, path, null);
    }
}
