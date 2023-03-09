import { AbstractApiGateway } from "./abstract_api_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { GetFiltersRequest } from "@cryptify/common/src/validations/get_filters_schema";
import { Filter } from "@cryptify/common/src/domain/entities/filter";
import { CreateFilterRequest } from "@cryptify/common/src/validations/create_filter_schema";
import { DeleteFilterRequest } from "@cryptify/common/src/validations/delete_filter_schema";

export class FiltersGateway extends AbstractApiGateway {
    constructor() {
        super();
    }

    async findAllFilters(req: GetFiltersRequest, token: string): Promise<Filter[]> {
        const path = `users/${req.id}/filters?currencyType=${req.currencyType}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Filter[]>(Method.GET, headers, path, null);
    }

    async createFilter(req: CreateFilterRequest, token: string): Promise<Filter> {
        const path = `users/${req.id}/filters`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Filter>(Method.POST, headers, path, req);
    }

    async deleteFilter(req: DeleteFilterRequest, token: string): Promise<Filter> {
        const path = `users/${req.id}/filters/${req.name}?currencyType=${req.currencyType}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.request<Filter>(Method.DELETE, headers, path, null);
    }
}
