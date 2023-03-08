import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Tag } from "@cryptify/common/src/domain/entities/tag";
import { CreateTagRequest } from "@cryptify/common/src/requests/create_tag_request";
import {
    ERROR_ADDRESS_ALREADY_ADDED_TO_CONTACT, ERROR_FILTER_ALREADY_EXISTS,
    ERROR_TAG_NAME_ALREADY_ADDED_TO_ACCOUNT,
    ERROR_TAG_NAME_ALREADY_EXIST,
    ERROR_TAG_NOT_FOUND,
    ERROR_TRANSACTIONS_NOT_FOUND,
} from "@cryptify/common/src/errors/error_messages";
import { UpdateTagRequest } from "@cryptify/common/src/requests/update_tag_request";
import { DeleteTagRequest } from "@cryptify/common/src/requests/delete_tag_request";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import {Filter, FilterBuilder} from "@cryptify/common/src/domain/entities/filter";
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
        const filters = await this.filtersRepository.findBy({
            userId: req.userId,
            currencyType: req.currencyType,
        });
        
        function hydrateRange(filter: Filter): Filter {
            if (filter.start === "curr") {
                filter.start = (+new Date()).toString();
            }
            if (filter.start[0] === "-") {
                filter.start = (+new Date() + +filter.start).toString();
            }

            if (filter.end === "curr") {
                filter.end = (+new Date()).toString();
            }
            if (filter.end[0] === "-") {
                filter.end = (+new Date() + +filter.end).toString();
            }
            
            return filter;
        }
        
        return filters.map((filter) => hydrateRange(filter));
    }

    async create(req: CreateFilterRequest): Promise<Filter> {
        const doesFilterExists = !!await this.filtersRepository.findOneBy({
            userId: req.userId,
            name: req.name,
            currencyType: req.currencyType,
        }); 
        if (doesFilterExists) {
            throw new BadRequestException(ERROR_FILTER_ALREADY_EXISTS);
        }

        const filter = new FilterBuilder()
            .setName(req.name)
            .setUserId(req.userId)
            .setCurrencyType(req.currencyType)
            .setTxns(req.txnIn, req.txnOut)
            .setRange(req.start, req.end)
            .setTagNames(req.tagNames)
            .setContactNames(req.contactNames)
            .build();

        return this.filtersRepository.save(this.filtersRepository.create(filter));
    }

    async delete(req: DeleteFilterRequest): Promise<Filter> {
        const filter = await this.filtersRepository.findOneBy({ 
            userId: req.userId,
            name: req.name,
            currencyType: req.currencyType,
        });
        if (!filter) {
            throw new BadRequestException("Filter not found");
        }

        return this.filtersRepository.remove(filter);
    }
}
