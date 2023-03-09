import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ERROR_FILTER_ALREADY_EXISTS } from "@cryptify/common/src/errors/error_messages";
import { Filter, FilterBuilder } from "@cryptify/common/src/domain/entities/filter";
import { CreateFilterRequest } from "@cryptify/common/src/validations/create_filter_schema";
import { GetFiltersRequest } from "@cryptify/common/src/validations/get_filters_schema";
import { DeleteFilterRequest } from "@cryptify/common/src/validations/delete_filter_schema";

@Injectable()
export class FiltersService {
    constructor(
        @InjectRepository(Filter)
        private filtersRepository: Repository<Filter>,
    ) {}

    async findAll(req: GetFiltersRequest): Promise<Filter[]> {
        return this.filtersRepository.findBy({
            userId: req.id,
            currencyType: req.currencyType,
        });
    }

    async create(req: CreateFilterRequest): Promise<Filter> {
        const doesFilterExists = !!(await this.filtersRepository.findOneBy({
            userId: req.userId,
            name: req.name,
            currencyType: req.currencyType,
        }));
        if (doesFilterExists) {
            throw new BadRequestException(ERROR_FILTER_ALREADY_EXISTS);
        }

        const filter = new FilterBuilder()
            .setName(req.name)
            .setUserId(req.userId)
            .setCurrencyType(req.currencyType)
            .setTxns(req.txnIn, req.txnOut)
            .setRange(req.range)
            .setTagNames(req.tagNames)
            .setContactNames(req.contactNames)
            .build();

        return this.filtersRepository.save(this.filtersRepository.create(filter));
    }

    async delete(req: DeleteFilterRequest): Promise<Filter> {
        const filter = await this.filtersRepository.findOneBy({
            userId: req.id,
            name: req.name,
            currencyType: req.currencyType,
        });
        if (!filter) {
            throw new BadRequestException("Filter not found");
        }

        return this.filtersRepository.remove(filter);
    }
}
