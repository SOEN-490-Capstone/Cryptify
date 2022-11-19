import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { CreateTagRequest } from "@cryptify/common/src/requests/create_tag_request";
import { ERROR_TAG_NAME_ALREADY_ADDED_TO_ACCOUNT } from "@cryptify/common/src/errors/error_messages";

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TransactionTag)
        private tagRepository: Repository<TransactionTag>,
    ) {}

    async findAll(userId: number): Promise<TransactionTag[]> {
        return this.tagRepository.findBy({ userId });
    }

    async create(req: CreateTagRequest): Promise<TransactionTag> {
        if (await this.tagRepository.findOneBy(req)) {
            throw new BadRequestException(ERROR_TAG_NAME_ALREADY_ADDED_TO_ACCOUNT);
        }
        const createdTag = this.tagRepository.create(req);
        await this.tagRepository.insert(createdTag);
        return await this.tagRepository.findOneBy(createdTag);
    }
}
