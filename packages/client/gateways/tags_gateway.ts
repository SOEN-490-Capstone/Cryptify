import { GetTagsRequest } from "@cryptify/common/src/requests/get_tag_request";
import { AbstractApiGateway } from "./abstract_api_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";

export class TagsGateway extends AbstractApiGateway {
    constructor() {
        super();
    }

    async findAlTags(req: GetTagsRequest, token: string): Promise<TransactionTag[]> {
        const path = `users/${req.id}/tags`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<TransactionTag[]>(Method.GET, headers, path, null);
    }
}
