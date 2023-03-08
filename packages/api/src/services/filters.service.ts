import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { CreateTagRequest } from "@cryptify/common/src/requests/create_tag_request";
import {
    ERROR_TAG_NAME_ALREADY_ADDED_TO_ACCOUNT,
    ERROR_TAG_NAME_ALREADY_EXIST,
    ERROR_TAG_NOT_FOUND,
    ERROR_TRANSACTIONS_NOT_FOUND,
} from "@cryptify/common/src/errors/error_messages";
import { UpdateTagRequest } from "@cryptify/common/src/requests/update_tag_request";
import { DeleteTagRequest } from "@cryptify/common/src/requests/delete_tag_request";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import {Filter} from "@cryptify/common/src/domain/entities/filter";
import {CreateFilterRequest} from "@cryptify/common/src/validations/create_filter_schema";
import {GetFiltersRequest} from "@cryptify/common/src/validations/get_filters_schema";
import {DeleteFilterRequest} from "@cryptify/common/src/validations/delete_filter_schema";

@Injectable()
export class FiltersService {
    constructor(
        @InjectRepository(Filter)
        private filtersRepository: Repository<Filter>,
    ) {}

    async findAll(req: GetFiltersRequest): Promise<Filter[]> {
        return null;
    }

    async create(req: CreateFilterRequest): Promise<Filter> {
        return null;
    }

    async delete(deleteTagRequest: DeleteFilterRequest): Promise<Filter> {
        return null;
    }
}
