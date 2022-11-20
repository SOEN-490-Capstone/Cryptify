import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { CreateTagRequest } from "@cryptify/common/src/requests/create_tag_request";
import {
    ERROR_TAG_NAME_ALREADY_ADDED_TO_ACCOUNT,
    ERROR_TAG_NAME_ALREADY_EXIST,
} from "@cryptify/common/src/errors/error_messages";
import { UpdateTagNameRequest } from "@cryptify/common/src/requests/update_tag_name_request";

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
        const tag = this.tagRepository.create(req);
        await this.tagRepository.insert(tag);
        return this.tagRepository.findOneBy(tag);
    }

    async update(updateTagNameRequest: UpdateTagNameRequest): Promise<TransactionTag> {
        // This statement checks if the transactionTag that we are requesting to update
        // exists in the database
        if (
            !(await this.tagRepository.findOneBy({
                userId: updateTagNameRequest.userId,
                tagName: updateTagNameRequest.currentName,
            }))
        ) {
            throw new BadRequestException();
        }

        if (
            await this.tagRepository.findOneBy({
                userId: updateTagNameRequest.userId,
                tagName: updateTagNameRequest.newName,
            })
        ) {
            throw new BadRequestException(ERROR_TAG_NAME_ALREADY_EXIST);
        }

        await this.tagRepository.update(
            { userId: updateTagNameRequest.userId, tagName: updateTagNameRequest.currentName },
            { tagName: updateTagNameRequest.newName },
        );

        return this.tagRepository.findOneBy({
            userId: updateTagNameRequest.userId,
            tagName: updateTagNameRequest.newName,
        });
    }
}
