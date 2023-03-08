import { GetTagsRequest } from "@cryptify/common/src/requests/get_tags_request";
import { UpdateTagRequest } from "@cryptify/common/src/requests/update_tag_request";
import { AbstractApiGateway } from "./abstract_api_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { CreateTagRequest } from "@cryptify/common/src/requests/create_tag_request";
import { DeleteTagRequest } from "@cryptify/common/src/requests/delete_tag_request";
import {GetFiltersRequest} from "@cryptify/common/src/validations/get_filters_schema";
import {Filter} from "@cryptify/common/src/domain/entities/filter";
import {CreateFilterRequest} from "@cryptify/common/src/validations/create_filter_schema";
import {DeleteFilterRequest} from "@cryptify/common/src/validations/delete_filter_schema";

export class FiltersGateway extends AbstractApiGateway {
    constructor() {
        super();
    }

    async findAllFilters(req: GetFiltersRequest, token: string): Promise<Filter[]> {
        const path = `users/${req.userId}/filters?currencyType=${req.currencyType}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Filter[]>(Method.GET, headers, path, null);
    }

    async createFilter(req: CreateFilterRequest, token: string): Promise<Filter> {
        const path = `users/${req.userId}/filters`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Filter>(Method.POST, headers, path, req);
    }

    async deleteFilter(req: DeleteFilterRequest, token: string): Promise<Filter> {
        const path = `users/${req.userId}/filters/${req.name}?currencyType=${req.currencyType}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Filter>(Method.DELETE, headers, path, null);
    }
}
